import { ProductDto } from './ProductDto'
import { ShopDto } from './ShopDto'

export interface StockDto {
  id: number
  quantity: number
  product?: ProductDto
  shop?: ShopDto
}
