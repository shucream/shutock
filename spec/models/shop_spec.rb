require 'rails_helper'

RSpec.describe Shop, type: :model do

  context 'Stock' do
    let(:stock) { create(:stock)}
    it 'Shop削除時に関連するStockが削除される' do
      shop = stock.shop
      expect { shop.destroy }.to change { Stock.count }.by(-1)
    end
  end

  context 'ShopImage' do
    let(:image) { create(:shop_image) }
    it 'Shop削除時に関連するShopImageが削除される' do
      shop = image.shop
      expect { shop.destroy }.to change { ShopImage.count }.by(-1)
    end
  end


end
