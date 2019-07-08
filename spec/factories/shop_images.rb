FactoryBot.define do
  factory :shop_image do
    shop { create(:shop) }
    after(:build) do |shop_image|
      shop_image.image.attach(io: File.open(Rails.root.join('spec', 'support', 'assets', 'sample.jpg')), filename: 'sample.jpeg', content_type: 'image/jpg')
    end
  end
end
