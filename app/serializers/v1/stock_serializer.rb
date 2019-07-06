class V1::StockSerializer < ActiveModel::Serializer
    attributes :quantity
    attribute :shop, serializer: V1::ShopSerializer
end