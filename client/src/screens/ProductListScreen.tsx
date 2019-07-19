import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import Section from '../components/atoms/Section'
import { ProductDto } from '../dto/ProductDto'
import ProductList from '../components/organisms/ProductList'
import ApiClient from '../lib/ApiClient'

type Props = RouteComponentProps

interface State {
  results: ProductDto[]
}

class ProductListScreen extends React.Component<Props, State> {
  public state: State = {
    results: []
  }

  public componentDidMount(): void {
    ApiClient.get<ProductDto[]>('/v1/products/').then(response => {
      if (response.success) {
        console.log(response.data)
        this.setState({ results: response.data })
      }
    })
  }

  public render() {
    return (
      <Background>
        <Section>全商品</Section>
        <Section>
          <ProductList products={this.state.results} />
        </Section>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default ProductListScreen
