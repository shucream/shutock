import React from 'react'
import styled from 'styled-components'
import Section from '../components/atoms/Section'
import Title from '../components/atoms/Title'
import { ProductDto } from '../dto/ProductDto'
import Description from '../components/atoms/Description'
import { Button, Grid } from '@material-ui/core'
import ShopList from '../components/organisms/ShopList'
import { ShopDto } from '../dto/ShopDto'
import Loading from '../components/atoms/Loading'
import StyledLink from '../components/atoms/StyledLink'
import { RouteComponentProps } from 'react-router'
import ApiClient from '../lib/ApiClient'
import ImageCarousel from '../components/organisms/ImageCarousel'

type Props = RouteComponentProps<{ id: string }>

interface State {
  product?: ProductDto
}

class ProductDetailScreen extends React.Component<Props, State> {
  public state: State = {}

  public componentDidMount(): void {
    ApiClient.get<ProductDto>(
      `/v1/products/${this.props.match.params.id}`
    ).then(response => {
      if (response.success) {
        console.log(response)
        this.setState({ product: response.data })
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
              <ImageCarousel
                data={product.product_images}
                style={{ flex: 1 }}
              />
            </Block>
            <Block
              style={{
                margin: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
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
            {this.state.product.stocks && (
              <ShopList
                shops={
                  this.state.product.stocks.map(
                    stock => stock.shop
                  ) as ShopDto[]
                }
              />
            )}
          </Section>
        </Background>
      )
    }
  }
}

const Background = styled.div`
  width: 100%;
`

const Block = styled.div`
  flex: 1;
  min-width: 300px;
`

const Price = styled.h3`
  font-size: 20px;
`

export default ProductDetailScreen
