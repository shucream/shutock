import { ProductDto } from '../dto/ProductDto'
import { ShopDto } from '../dto/ShopDto'

export interface SuccessResponse<T> {
  data: T
  success: true
}
