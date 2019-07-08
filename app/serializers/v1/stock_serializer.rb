class V1::StockSerializer < ActiveModel::Serializer
  attributes :quantity
  has_one :shop, serializer: V1::ShopSerializer
  has_one :product, serializer: V1::ProductSerializer
end
