class V1::StocksController < ApplicationController
  def create
    @stock = Stock.create(create_params)
    @product = @stock.product
    render json: @product, serializer: V1::ProductSerializer, include: { stocks: [:shop], product_images: [] }
  end

  def update
    @stock = Stock.find(update_params[:id])
    @product = @stock.update!(update_params[:quantity])
    render json: @product, serializer: V1::ProductSerializer, include: { stocks: [:shop], product_images: [] }
  end

  def destroy
    @stock = Stock.find(params[:id])
    @stock.destroy()
    render json: []
  end

  private

  def create_params
    params.permit(:product_id, :shop_id, :quantity)
  end

  def update_params
    params.permit(:id, :product_id, :shop_id, :quantity)
  end
end
