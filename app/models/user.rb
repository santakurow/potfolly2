class User < ApplicationRecord
  include Rails.application.routes.url_helpers
  
  before_save { self.email = email.downcase }
  validates :nickname, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
                    
  has_secure_password
  has_one_attached :avatar
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  def image_url
    rails_blob_path(self.avatar, disposition: "attachment", only_path: true)
  end
end
