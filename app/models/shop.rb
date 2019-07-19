class Shop < ApplicationRecord
  has_many :stocks, dependent: :delete_all
  has_many :products, through: :stocks
  has_many :shop_images, dependent: :delete_all

  validates :name, presence: true, uniqueness: true

  scope :search_name, -> (query) { where(Shop.arel_table[:name].matches("%#{query}%")) }
end
