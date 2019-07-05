class Shop < ApplicationRecord
    has_many :stocks
    has_many :products, through: :stocks
end
