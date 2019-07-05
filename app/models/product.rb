class Product < ApplicationRecord
  validates :name, presence: true, length: { maximum: 100 }
  validates :description, length: { maximum: 500 }
  validates :price, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end