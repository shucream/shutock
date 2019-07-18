class V1::Search::ProductsController < ApplicationController
  def index
    @result = Product.search_name(search_params[:q])
    render json: @result, each_serializer: V1::ProductSerializer, include: {}
  end

  private

  def search_params
    params.permit(:q)
  end
end
