FactoryBot.define do
  factory :shop_image do
    shop { create(:shop) }
    image { Rails.root.join('spec', 'support', 'assets', 'sample.jpg').open }
  end
end
