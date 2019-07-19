class V1::ShopsController < ApplicationController
  def index
    render json: Shop.all, each_serializer: V1::ShopSerializer, include: { shop_images: [] }
  end

  def show
    @shop = Shop.find(params[:id])
    render json: @shop, serializer: V1::ShopSerializer, include: { shop_images: [], stocks: [:product] }
  end

  def create
    @shop = Shop.new(create_shop_params.slice(:name, :address))
    create_shop_params[:images]&.each do |image|
      @shop.shop_images.new(image: image)
    end
    @shop.save!
    render json: @shop, serializer: V1::ShopSerializer, include: { shop_images: [] }
  end

  def update
    @shop = Shop.update!(update_shop_params)
    render json: @shop, serializer: V1::ShopSerializer, include: { shop_images: [], stocks: [:product] }
  end

  def destroy
    @shop = Shop.find(params[:id])
    render json: @shop.destroy!
  end

  private

  def create_shop_params
    params.permit(:name, :address, images: [])
  end

  def update_shop_params
    params.permit(:name, :address)
  end
end
