class V1::ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price
  has_many :stocks, serializer: V1::StockSerializer
  has_many :product_images, serializer: V1::ProductImageSerializer
end
