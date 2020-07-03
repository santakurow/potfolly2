class Portfolio < ApplicationRecord
  include Rails.application.routes.url_helpers

  validates :title, presence: true, length: {maximum: 50}

  VALID_URL_REGEX = /\A#{URI::regexp(%w(http https))}\z/

  validates :url, presence: true, format: {with: VALID_URL_REGEX}

  belongs_to :user

  has_one_attached :image

  def image_url
    rails_blob_path(self.image, disposition: "attachment", only_path: true)
  end
end
