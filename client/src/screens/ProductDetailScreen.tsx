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
import { RouteComponentProps, withRouter } from 'react-router'
import ApiClient from '../lib/ApiClient'
import ImageCarousel from '../components/organisms/ImageCarousel'

type Props = RouteComponentProps<{ id: string }>

interface State {
  product: ProductDto
  loading: boolean
}

class ProductDetailScreen extends React.Component<Props, State> {
  public state: State = {
    product: {
      id: 0,
      name: '',
      description: '',
      price: 0,
      product_images: [],
      stocks: []
    },
    loading: true
  }

  public async componentDidMount() {
    const response = await ApiClient.get<ProductDto>(
      `/v1/products/${this.props.match.params.id}`
    )
    if (response.success) {
      this.setState({ product: response.data, loading: false })
    }
  }

  public render() {
    const product = this.state.product
    return (
      <Background>
        <Section style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Block>
            <ImageCarousel data={product.product_images} style={{ flex: 1 }} />
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleDeleteProduct.bind(this)}
              >
                削除
              </Button>
            </Grid>
          </Block>
        </Section>
        <Section>
          <Title>取扱店舗</Title>
          {product.stocks && (
            <ShopList
              shops={product.stocks.map(stock => stock.shop) as ShopDto[]}
            />
          )}
        </Section>
        <Loading loading={this.state.loading} />
      </Background>
    )
  }

  private handleDeleteProduct = async () => {
    this.setState({ loading: true })
    const productId = this.props.match.params.id
    const response = await ApiClient.delete(`/v1/products/${productId}`)
    if (response.success) {
      this.setState({ loading: false })
      this.props.history.push('/')
    } else {
      console.log(response.detail)
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

export default withRouter(ProductDetailScreen)
