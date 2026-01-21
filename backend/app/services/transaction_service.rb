class TransactionService
  def initialize(user, params)
    @user = user
    @params = params
    @account = user.account
  end

  def call
    ActiveRecord::Base.transaction do
      type = @params[:type]
      amount = @params[:amount].to_f
      description = @params[:description]

      case type
      when 'deposit'
        deposit(amount, description)
      when 'withdraw'
        withdraw(amount, description)
      when 'transfer_out'
        transfer(amount, description, @params[:target_email])
      else
        raise StandardError, "Invalid transaction type"
      end
    end
  end

  private

  def deposit(amount, description)
    @account.with_lock do
      @account.balance += amount
      @account.save!
      
      Transaction.create!(
        account: @account,
        amount: amount,
        transaction_type: 'deposit',
        description: description || 'Deposit'
      )
    end
  end

  def withdraw(amount, description)
    @account.with_lock do
      raise StandardError, "Insufficient funds" if @account.balance < amount

      @account.balance -= amount
      @account.save!

      Transaction.create!(
        account: @account,
        amount: amount,
        transaction_type: 'withdraw',
        description: description || 'Withdraw'
      )
    end
  end

  def transfer(amount, description, target_email)
    target_user = User.find_by(email: target_email)
    raise StandardError, "User not found" unless target_user
    raise StandardError, "Cannot transfer to self" if target_user.id == @user.id

    target_account = target_user.account

    @account.with_lock do
      target_account.with_lock do
        raise StandardError, "Insufficient funds" if @account.balance < amount

        # Debit sender
        @account.balance -= amount
        @account.save!

        # Credit receiver
        target_account.balance += amount
        target_account.save!

        # Record for sender
        Transaction.create!(
          account: @account,
          related_account: target_account,
          amount: amount,
          transaction_type: 'transfer_out',
          description: description || "Transfer to #{target_user.name}"
        )

        # Record for receiver
        Transaction.create!(
          account: target_account,
          related_account: @account,
          amount: amount,
          transaction_type: 'transfer_in',
          description: "Transfer from #{@user.name}"
        )
      end
    end
  end
end
