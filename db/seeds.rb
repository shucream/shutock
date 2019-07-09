puts 'Start seeds...'

DUMMY_SHOPS_COUNT = 10
DUMMY_PRODUCTS_COUNT = 100

DUMMY_SHOPS_COUNT.times do |i|
  shop = Shop.new(
    name: i.to_s+Faker::Company.name,
    address: Faker::Address.full_address
  )
  shop.shop_images.append(FactoryBot.build(:shop_image, shop: shop))
  shop.save!
end

DUMMY_PRODUCTS_COUNT.times do |i|
  product = Product.new(
    name: i.to_s+Faker::Food.dish,
    description: Faker::Food.description,
    price: Faker::Number.between(1, 10) * 100
  )
  shop = Shop.find(Faker::Number.between(1, DUMMY_SHOPS_COUNT))
  product.stocks.new(shop: shop, quantity: Faker::Number.between(1, 10))
  product.product_images.append(FactoryBot.build(:product_image, product: product))
  product.save!
end

puts 'Finish seeds.'
