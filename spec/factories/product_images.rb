FactoryBot.define do
  factory :product_image do
    name { Faker::Book.title }
    product { create(:product) }
    image { Rails.root.join('spec', 'support', 'assets', 'sample.jpg').open }
  end
end
