import React from 'react'
import styled from 'styled-components'
import Section from '../components/atoms/Section'
import Title from '../components/atoms/Title'
import { ProductDto } from '../dto/ProductDto'
import Description from '../components/atoms/Description'
import { Button, Grid } from '@material-ui/core'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider
} from 'pure-react-carousel'
import ShopList from '../components/organisms/ShopList'
import { ShopDto } from '../dto/ShopDto'
import Loading from '../components/atoms/Loading'
import StyledLink from '../components/atoms/StyledLink'
import { RouteComponentProps } from 'react-router'
import ApiClient from '../lib/ApiClient'

type Props = RouteComponentProps<{ id: string }>

interface State {
  product?: ProductDto
}

class ProductDetailScreen extends React.Component<Props, State> {
  public state: State = {
    product: {
      id: 1,
      name: 'iOSいいパン',
      description: '遊んで遊んで遊んで遊んで',
      price: 10000,
      product_images: [
        {
          thumbnail: 'http://www.marond.com/images/bread/bread_al_200.jpg',
          large: 'http://www.marond.com/images/bread/bread_al_200.jpg'
        },
        {
          thumbnail: 'http://www.marond.com/images/bread/bread_al_200.jpg',
          large: 'http://www.marond.com/images/bread/bread_al_200.jpg'
        },
        {
          thumbnail: 'http://www.marond.com/images/bread/bread_al_200.jpg',
          large: 'http://www.marond.com/images/bread/bread_al_200.jpg'
        },
        {
          thumbnail: 'http://www.marond.com/images/bread/bread_al_200.jpg',
          large: 'http://www.marond.com/images/bread/bread_al_200.jpg'
        }
      ],
      stocks: []
    }
  }

  public componentDidMount(): void {
    ApiClient.get<ProductDto>(
      `/v1/products/${this.props.match.params.id}`
    ).then(response => {
      if (response.success) {
        this.setState({ product: response.data })
        console.log(response)
      }
    })
  }

  public render() {
    if (!this.state.product) {
      return <Loading />
    } else {
      const product = this.state.product
      return (
        <Background>
          <Section style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            <Block>
              <MainImageBox>
                <img
                  src={product.product_images[0].large}
                  style={{ width: '100%' }}
                />
              </MainImageBox>
              <SubImageList>
                {product.product_images.map(image => (
                  <SubImageBox>
                    <img src={image.thumbnail} style={{ width: '100%' }} />
                  </SubImageBox>
                ))}
              </SubImageList>
            </Block>
            <Block
              style={{ margin: 10, display: 'flex', flexDirection: 'column' }}
            >
              <div>
                <Title>{product.name}</Title>
                <Description>{product.description}</Description>
                <Price>{product.price}円</Price>
              </div>
              <Grid container justify="flex-end">
                <StyledLink to={'/products/' + product.id.toString() + '/edit'}>
                  <Button variant="outlined" style={{ marginRight: 10 }}>
                    編集
                  </Button>
                </StyledLink>
                <StyledLink
                  to={'/products/' + product.id.toString() + '/delete'}
                >
                  <Button variant="outlined" color="secondary">
                    削除
                  </Button>
                </StyledLink>
              </Grid>
            </Block>
          </Section>
          <Section>
            <Title>取扱店舗</Title>
            {this.state.product.stocks}
            <ShopList
              shops={
                this.state.product.stocks.map(stock => stock.shop) as ShopDto[]
              }
            />
          </Section>
        </Background>
      )
    }
  }
}

const Background = styled.div`
  width: 100%;
`

const MainImageBox = styled.div`
  display: flex;
  height: auto;
  margin-bottom: 3px;
`

const SubImageList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const SubImageBox = styled.div`
  flex: 1;
  max-width: 20%;
  min-width: 20%;
`

const Block = styled.div`
  flex: 1;
  min-width: 300px;
`

const Price = styled.h3`
  font-size: 20px;
`

export default ProductDetailScreen
