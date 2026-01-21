module Api
  module V1
    class TransactionsController < ApplicationController
      before_action :authenticate_user!

      def index
        transactions = current_user.account.transactions.recent.limit(20)
        render json: transactions
      end

      def create
        begin
          transaction = TransactionService.new(current_user, transaction_params).call
          render json: transaction, status: :created
        rescue StandardError => e
          render json: { error: e.message }, status: :unprocessable_entity
        end
      end

      private

      def transaction_params
        params.require(:transaction).permit(:type, :amount, :description, :target_email)
      end
    end
  end
end
