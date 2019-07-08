class ShopImage < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :shop
  has_one_attached :image

  def url
    url_for(image.variant(resize: '300x300'))
  end
end
