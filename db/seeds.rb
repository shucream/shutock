puts 'Start seeds...'

DUMMY_SHOPS_COUNT = 10
DUMMY_PRODUCTS_COUNT = 100

DUMMY_SHOPS_COUNT.times do
    Shop.create!(
            name: Faker::Company.name,
            address: Faker::Address.full_address
    )
end

DUMMY_PRODUCTS_COUNT.times do
    product = Product.new(
        name: Faker::Food.dish,
        description: Faker::Food.description,
        price: Faker::Number.between(1, 10)*100
    )
    shop = Shop.find(Faker::Number.between(1, DUMMY_SHOPS_COUNT))
    product.stocks.new(shop: shop, quantity: Faker::Number.between(1,10))
    product.save!
end

puts 'Finish seeds.'