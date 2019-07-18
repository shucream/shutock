import React from 'react'
import { ProductDto } from '../../dto/ProductDto'
import ProductListItem from './ProductListItem'

interface Props {
  products: ProductDto[]
}

const ProductList: React.FC<Props> = props => {
  const { products } = props

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      {products.map(product => (
        <ProductListItem product={product} />
      ))}
    </div>
  )
}

export default ProductList
