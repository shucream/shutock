class Stock < ApplicationRecord
  belongs_to :product
  belongs_to :shop

  validates :product_id, uniqueness: { scope: [:shop_id] }
end
