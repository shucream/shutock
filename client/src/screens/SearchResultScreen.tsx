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

class SearchResultScreen extends React.Component<Props, State> {
  public state: State = {
    results: []
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
      </Background>
    )
  }

  private search() {
    const q = this.props.location.search.replace(/\?q=/, '')
    ApiClient.get<ProductDto[]>(`/v1/search/products?q=${q}`).then(response => {
      if (response.success) {
        console.log(response)
        this.setState({ results: response.data })
      } else {
        console.log(response)
      }
    })
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default SearchResultScreen
