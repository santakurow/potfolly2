class Category < ApplicationRecord
  validates :name, presence: true
  has_ancestry
end