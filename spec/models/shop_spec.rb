require 'rails_helper'

RSpec.describe Shop, type: :model do
  before :each do
    @stock = create(:stock)
  end

  it 'Shop削除時に関連するStockが削除される' do
    shop = @stock.shop
    expect { shop.destroy }.to change { Stock.count }.by(-1)
  end
end
