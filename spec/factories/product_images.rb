FactoryBot.define do
  factory :product_image do
    name { Faker::Book.title }
    product { create(:product) }
    after(:build) do |product_image|
      product_image.image.attach(io: File.open(Rails.root.join('spec', 'support', 'assets', 'sample.jpg')), filename: 'sample.jpeg', content_type: 'image/jpg')
    end
  end
end
