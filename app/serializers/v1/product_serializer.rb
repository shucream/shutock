class V1::ProductSerializer < ActiveModel::Serializer
    attributes :id, :name, :description
    has_many :stocks
end