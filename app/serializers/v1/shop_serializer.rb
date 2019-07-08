class V1::ShopSerializer < ActiveModel::Serializer
  attributes :id, :name, :address
  has_many :stocks, serializer: V1::StockSerializer
end
