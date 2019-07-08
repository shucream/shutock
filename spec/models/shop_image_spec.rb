require 'rails_helper'

RSpec.describe ShopImage, type: :model do
  let(:shop_image) { create(:shop_image) }
  it '画像を1枚添付できる' do
    expect(shop_image.image).to be_an_instance_of(ActiveStorage::Attached::One)
  end
end
