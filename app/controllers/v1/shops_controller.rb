class V1::ShopsController < ApplicationController
  def index
    render json: Shop.all, each_serializer: V1::ShopSerializer, include: {}
  end

  def show
    @shop = Shop.find(params[:id])
    render json: @shop, serializer: V1::ShopSerializer, include: { stocks: [:product] }
  end

  def create
    @shop = Shop.new(create_shop_params.slice(:name, :address))
    # 画像の保存処理
    # @shop.shopImages
    @shop.save!
    render json: @shop, serializer: V1::ShopSerializer, include: {}
  end

  def update
    @shop = Shop.update!(update_shop_params)
    render json: @shop, serializer: V1::ShopSerializer, include: { stocks: [:product] }
  end

  private

  def create_shop_params
    params.permit(:name, :address, images: [])
  end

  def update_shop_params
    params.permit(:name, :address)
  end
end
