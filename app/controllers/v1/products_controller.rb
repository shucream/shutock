class V1::ProductsController < ApplicationController
  def create
    @product = Product.new(
      name: create_product_params[:name],
      description: create_product_params[:description],
      price: create_product_params[:price].to_i
    )
    create_product_params[:stocks]&.each do |stock_attributes|
      @product.stocks.new(
        shop_id: stock_attributes[:shop_id].to_i,
        quantity: stock_attributes[:quantity]
      )
    end
    create_product_params[:images]&.each do |image|
      @product.product_images.new(image: image)
    end
    @product.save!
    render json: @product, serializer: V1::ProductSerializer, include: [{product_images: []}, { stocks: [:shop]}]
  end

  def index
    render json: Product.all, each_serializer: V1::ProductSerializer, include: { product_images: [] }
  end

  def show
    @product = Product.find(params[:id])
    render json: @product, serializer: V1::ProductSerializer, include: { stocks: [:shop], product_images: [] }
  end

  def update
    @product = Product.find(params[:id])
    @product.update!(update_product_params)
    render json: @product, serializer: V1::ProductSerializer, include: { stocks: [:shop] }
  end

  def destroy; end

  private

  def create_product_params
    params.permit(
      :name,
      :description,
      :price,
      images: [],
      stocks: %i[
        shop_id
        quantity
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
