import { StockDto } from './StockDto'

export interface ProductDto {
  id: number
  name: string
  description: string
  price: number
  product_images: ProductImageDto[]
  stocks: StockDto[]
}

export interface ProductImageDto {
  thumbnail: string
  large: string
}
