require 'rails_helper'

RSpec.describe ProductImage, type: :model do
  let(:product_image) { create(:product_image)}
  it '画像を1枚添付できる' do
    # expect(product_image.image).to be_an_instance_of(ActiveStorage::Attached::One)
  end
end
