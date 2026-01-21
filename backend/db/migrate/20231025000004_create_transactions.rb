class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|
      t.references :account, null: false, foreign_key: true
      t.decimal :amount, precision: 15, scale: 2, null: false
      t.string :transaction_type, null: false # deposit, withdraw, transfer_in, transfer_out
      t.string :description
      t.references :related_account, foreign_key: { to_table: :accounts }, null: true # For transfers

      t.timestamps
    end
  end
end
