import React from 'react'
import styled from 'styled-components'

interface Props {}

class ProductDetailScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <p>product detail</p>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default ProductDetailScreen
