class V1::ProductImageSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers

    attributes :name, :thumbnail, :large

    def thumbnail
        url_for(object.image.variant(resize: '300x300'))
    end

    def large
        url_for(object.image.variant(resize: '1024x1024'))
    end
end