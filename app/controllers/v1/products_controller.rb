class V1::ProductsController < ApplicationController
  def create
    puts(create_product_params)
    @product = Product.new(
        name: create_product_params[:name],
        description: create_product_params[:description],
        price: create_product_params[:price].to_i
    )
    create_product_params[:shop].each do |shop_quantity|
      @product.stocks.new(
          shop_id: shop_quantity[:shop_id].to_i,
          quantity: shop_quantity[:quantity]
      )
    end
    @product.save!
    render json: @product, serializer: V1::ProductSerializer, include: { stocks: [ :shop ] }
  end

  def index
    render json: Product.all, each_serializer: V1::ProductSerializer, include: { stocks: [ :shop ] }
  end

  def show
    @product = Product.find(params[:id])
    render json: @product, serializer: V1::ProductSerializer, include: { stocks: [ :shop ] }
  end

  def update
    @product = Product.find(params[:id])
    @priduct.update!(update_product_params)
    render json: @product, serializer: V1::ProductSerializer, include: { stocks: [ :shop ] }
  end

  def destroy; end

  private

  def create_product_params
    params.permit(
        :name,
        :description,
        :price,
        images: [],
        shop: [
            :shop_id,
            :quantity
        ]
    )
  end

  def update_product_params
    params.permit(
         :name,
         :description,
         :price
    )
  end
end
