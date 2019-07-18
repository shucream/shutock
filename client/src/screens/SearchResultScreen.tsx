import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import Section from '../components/atoms/Section'
import { ProductDto } from '../dto/ProductDto'
import ProductList from '../components/organisms/ProductList'

type Props = RouteComponentProps

interface State {
  results: ProductDto[]
}

class SearchResultScreen extends React.Component<Props, State> {
  public state: State = {
    results: [
      {
        id: 1,
        name: '名前',
        description: '説明文',
        price: 400,
        product_images: [
          {
            thumbnail: 'http://www.marond.com/images/bread/bread_al_200.jpg',
            large: 'http://www.marond.com/images/bread/bread_al_200.jpg'
          }
        ],
        stocks: []
      },
      {
        id: 2,
        name: '名前',
        description: '説明文',
        price: 400,
        product_images: [
          {
            thumbnail: 'http://www.marond.com/images/bread/bread_al_200.jpg',
            large: 'http://www.marond.com/images/bread/bread_al_200.jpg'
          }
        ],
        stocks: []
      },
      {
        id: 3,
        name: '名前',
        description: '説明文',
        price: 400,
        product_images: [
          {
            thumbnail: 'http://www.marond.com/images/bread/bread_al_200.jpg',
            large: 'http://www.marond.com/images/bread/bread_al_200.jpg'
          }
        ],
        stocks: []
      }
    ]
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
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default SearchResultScreen
