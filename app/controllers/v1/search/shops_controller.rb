class V1::Search::ShopsController < ApplicationController
  def index
    @result = Shop.search_name(search_params[:q])
    render json: @result, each_serializer: V1::ShopSerializer, include: { shop_images: [] }
  end

  private

  def search_params
    params.permit(:q)
  end
end
