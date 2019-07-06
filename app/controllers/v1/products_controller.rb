class V1::ProductsController < ApplicationController
  def create
    @product = Product.new(
        name: create_product_params[:name],
        description: create_product_params[:description],
        price: create_product_params[:price].to_i
    )
    @product.stocks.new(
        shop_id: create_product_params[:shop_id].to_i,
        quantity: create_product_params[:quantity]
    )
    @product.save!
    render status: 200, json: @product
  end

  def index
    render json: Product.all, each_serializer: V1::ProductSerializer, include: '**'
  end

  def show
    @product = Product.find(params[:id])
    render json: @product, serializer: V1::ProductSerializer
  end

  def update; end

  def destroy; end

  private

  def create_product_params
    params.permit(:name, :description, :price, :shop_id, :quantity)
  end
end
