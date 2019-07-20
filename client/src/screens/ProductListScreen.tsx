import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import Section from '../components/atoms/Section'
import { ProductDto } from '../dto/ProductDto'
import ProductList from '../components/organisms/ProductList'
import ApiClient from '../lib/ApiClient'
import Loading from '../components/atoms/Loading'

type Props = RouteComponentProps

interface State {
  results: ProductDto[]
  loading: boolean
}

class ProductListScreen extends React.Component<Props, State> {
  public state: State = {
    results: [],
    loading: false
  }

  public async componentDidMount() {
    this.setState({ loading: true })
    const response = await ApiClient.get<ProductDto[]>('/v1/products/')
    if (response.success) {
      this.setState({ results: response.data, loading: false })
    } else {
      console.log(response.detail)
    }
  }

  public render() {
    return (
      <Background>
        <Section>全商品</Section>
        <Section>
          <ProductList products={this.state.results} />
        </Section>
        <Loading loading={this.state.loading} />
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
`

export default ProductListScreen
