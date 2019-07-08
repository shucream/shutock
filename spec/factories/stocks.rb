FactoryBot.define do
  factory :stock do
    product { FactoryBot.create(:product) }
    shop { FactoryBot.create(:shop) }
    quantity { 1 }
  end
end
