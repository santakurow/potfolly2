class User < ApplicationRecord
  include Rails.application.routes.url_helpers
  
  attr_accessor :reset_password, :reset_password_confirmation
  
  before_save { self.email = email.downcase }

  has_one_attached :avatar
  has_secure_password
  
  validates :nickname, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }, 
                       allow_nil: true

  validates :reset_password, length: { minimum: 6 }, confirmation: true,
                             allow_nil: true,
                             on: :update
  validates :reset_password_confirmation, presence: true,
                             allow_nil: true,
                             on: :update
  
  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def create_reset_digest
    update_attribute(:reset_digest, User.digest(self.reset_password))
  end

  def image_url
    rails_blob_path(self.avatar, disposition: "attachment", only_path: true)
  end

end
