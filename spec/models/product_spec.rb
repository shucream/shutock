require 'rails_helper'

RSpec.describe Product, type: :model do
    describe 'バリデーション' do

        let(:build_product) { build(:product) }

        it 'nameがnilだとinvalid' do
            build_product.name = nil
            expect{ build_product.save! }.to raise_error ActiveRecord::RecordInvalid
        end

        it 'nameが100文字より大きいとinvalid' do
            build_product.name = 'a' * 101
            expect{ build_product.save! }.to raise_error ActiveRecord::RecordInvalid
        end

        it 'nameが100文字以内でvalid' do
            build_product.name = 'a' * 100
            expect(build_product).to be_valid
        end

        it 'descriptionが500文字より大きいとinvalid' do
            build_product.description = 'a' * 501
            expect{ build_product.save! }.to raise_error ActiveRecord::RecordInvalid
        end

        it 'descriptionが500文字以内でvalid' do
            build_product.description = 'a' * 500
            expect(build_product).to be_valid
        end

    end
end