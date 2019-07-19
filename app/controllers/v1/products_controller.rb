class V1::ProductsController < ApplicationController
  def create
    @product = Product.new(
      name: create_product_params[:name],
      description: create_product_params[:description],
      price: create_product_params[:price].to_i
    )
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
    Product.transaction do
      @product.update!({
           name: update_product_params[:name],
           description: update_product_params[:description],
           price: update_product_params[:price]
       })
      update_product_params[:images]&.each do |image|
        @product.product_images.new(image: image)
      end
      @product.save!
    end
    render json: @product, serializer: V1::ProductSerializer, include: { product_images: [] }
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy()
    render json: []
  end

  private

  def create_product_params
    params.permit(
      :name,
      :description,
      :price,
      images: []
    )
  end

  def update_product_params
    params.permit(
      :id,
      :name,
      :description,
      :price,
      images: []
    )
  end
end
