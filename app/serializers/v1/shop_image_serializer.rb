class V1::ShopImageSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers

    attributes :thumbnail, :large

    def thumbnail
        url_for(object.image.variant(resize: '300x300'))
    end

    def large
        url_for(object.image.variant(resize: '1024x1024'))
    end
end