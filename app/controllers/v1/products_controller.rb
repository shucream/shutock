class V1::ProductsController < ApplicationController
  def create
    @product = Product.create!(name: create_product_params[:name], price: create_product_params[:price].to_i)
    render status: 200, json: { status: 200, message: @product.to_s }
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
    params.permit(:name, :description, :price)
  end
end
