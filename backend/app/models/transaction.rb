class Transaction < ApplicationRecord
  belongs_to :account
  belongs_to :related_account, class_name: 'Account', optional: true

  validates :amount, numericality: { greater_than: 0 }
  validates :transaction_type, presence: true, inclusion: { in: %w[deposit withdraw transfer_in transfer_out] }

  scope :recent, -> { order(created_at: :desc) }
end
