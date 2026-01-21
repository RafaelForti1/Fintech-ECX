module Api
  module V1
    class AccountsController < ApplicationController
      before_action :authenticate_user!

      def show
        render json: {
          balance: current_user.account.balance,
          status: current_user.account.status,
          account_number: current_user.account.id
        }
      end
    end
  end
end
