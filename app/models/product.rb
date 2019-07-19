class Product < ApplicationRecord
  has_many :stocks, dependent: :delete_all
  has_many :shops, through: :stocks
  has_many :product_images, dependent: :delete_all

  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :description, length: { maximum: 500 }
  validates :price, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  scope :search_name, -> (query) { where(Product.arel_table[:name].matches("%#{query}%")) }
end
