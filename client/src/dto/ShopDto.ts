import { StockDto } from './StockDto'

export interface ShopDto {
  id: number
  name: string
  address: string
  shop_images: ShopImageDto[]
  stocks: StockDto[]
}

export interface ShopImageDto {
  thumbnail: string
  large: string
}
