class V1::ShopSerializer < ActiveModel::Serializer
  attributes :id, :name, :address
  has_many :stocks, serializer: V1::StockSerializer
  has_many :shop_images, serializer: V1::ShopImageSerializer
end
