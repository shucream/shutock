FactoryBot.define do
    factory :product, class: Product do
        name { "test_product" }
        description { "test description" }
        price { 1000 }
    end
end