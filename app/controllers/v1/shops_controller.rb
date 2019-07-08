class V1::ShopsController < ApplicationController

  def index
    render json: Shop.all, each_serializer: V1::ShopSerializer, include: {}
  end

  def show
    @shop = Shop.find(params[:id])
    render json: @shop, serializer: V1::ShopSerializer, include: { stocks: [ :product ] }
  end

  def create

  end


end
