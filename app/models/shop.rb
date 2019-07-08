class Shop < ApplicationRecord
    has_many :stocks, dependent: :delete_all
    has_many :products, through: :stocks
end
