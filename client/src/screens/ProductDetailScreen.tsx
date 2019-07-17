import React from 'react'
import styled from 'styled-components'

interface Props {}

const ProductDetailScreen: React.FC<Props> = () => {
  return (
    <Background>
      <p>product detail</p>
    </Background>
  )
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default ProductDetailScreen
