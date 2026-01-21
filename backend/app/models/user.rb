class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_one :account, dependent: :destroy
  
  after_create :create_digital_account

  validates :name, presence: true

  private

  def create_digital_account
    Account.create(user: self, balance: 0.0, status: 'active')
  end
end
