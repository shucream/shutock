require 'rails_helper'

RSpec.describe Product, type: :model do
  describe '入力バリデーション' do
    let(:build_product) { build(:product) }

    it 'nameがnilだとinvalid' do
      build_product.name = nil
      expect { build_product.save! }.to raise_error ActiveRecord::RecordInvalid
    end

    it 'nameが100文字より大きいとinvalid' do
      build_product.name = 'a' * 101
      expect { build_product.save! }.to raise_error ActiveRecord::RecordInvalid
    end

    it 'nameが100文字以内でvalid' do
      build_product.name = 'a' * 100
      expect(build_product).to be_valid
    end

    it 'descriptionが500文字より大きいとinvalid' do
      build_product.description = 'a' * 501
      expect { build_product.save! }.to raise_error ActiveRecord::RecordInvalid
    end

    it 'descriptionが500文字以内でvalid' do
      build_product.description = 'a' * 500
      expect(build_product).to be_valid
    end
  end

  describe '削除' do
    context 'Stock' do
      let(:stock) { create(:stock) }
      it 'Product削除時に関連するStockが削除される' do
        product = stock.product
        expect { product.destroy }.to change { Stock.count }.by(-1)
      end
    end

    context 'ProductImage' do
      let(:image) { create(:product_image)}
      it 'Product削除時に関連するProductImageが削除される' do
        product = image.product
        expect { product.destroy }.to change { ProductImage.count }.by(-1)
      end
    end

  end
end
