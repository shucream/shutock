class Stock < ApplicationRecord
  belongs_to :product
  belongs_to :shop
end
