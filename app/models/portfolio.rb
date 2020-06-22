class Portfolio < ApplicationRecord
  validates :title, presence: true, length: {maximum: 50}

  VALID_URL_REGEX = /\A#{URI::regexp(%w(http https))}\z/

  validates :url, presence: true, 
  format: {with: VALID_URL_REGEX}

  has_one_attached :image
end
