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

class SearchResultScreen extends React.Component<Props, State> {
  public state: State = {
    results: [],
    loading: false
  }

  componentDidMount(): void {
    this.search()
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location.search !== prevProps.location.search) {
      this.search()
    }
  }

  public render() {
    return (
      <Background>
        <Section>検索結果</Section>
        <Section>
          <ProductList products={this.state.results} />
        </Section>
        <Loading loading={this.state.loading} />
      </Background>
    )
  }

  private async search() {
    this.setState({ loading: true })
    const q = this.props.location.search.replace(/\?q=/, '')
    const response = await ApiClient.get<ProductDto[]>(
      `/v1/search/products?q=${q}`
    )
    if (response.success) {
      this.setState({ results: response.data, loading: false })
    } else {
      console.log(response)
    }
  }
}

const Background = styled.div`
  width: 100%;
`

export default SearchResultScreen
