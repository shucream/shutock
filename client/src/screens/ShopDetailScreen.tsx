import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import ApiClient from '../lib/ApiClient'
import { ShopDto } from '../dto/ShopDto'
import { ProductDto } from '../dto/ProductDto'
import Section from '../components/atoms/Section'
import ImageCarousel from '../components/organisms/ImageCarousel'
import Description from '../components/atoms/Description'
import Title from '../components/atoms/Title'
import Loading from '../components/atoms/Loading'
import { Button, Grid } from '@material-ui/core'
import StyledLink from '../components/atoms/StyledLink'
import ProductList from '../components/organisms/ProductList'

type Props = RouteComponentProps<{ id: string }>

interface State {
  shop: ShopDto
  loading: boolean
}

class ShopDetailScreen extends React.Component<Props, State> {
  public state: State = {
    shop: {
      id: 0,
      name: '',
      address: '',
      shop_images: [],
      stocks: []
    },
    loading: false
  }

  public async componentDidMount() {
    this.setState({ loading: true })
    const response = await ApiClient.get<ShopDto>(
      `/v1/shops/${this.props.match.params.id}`
    )
    if (response.success) {
      this.setState({ shop: response.data, loading: false })
    } else {
      console.log(response.detail)
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      // 取扱商品
    }
  }

  public render() {
    const shop = this.state.shop
    return (
      <Background>
        <Section style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Block>
            <ImageCarousel data={shop.shop_images} style={{ flex: 1 }} />
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
              <Title>{shop.name}</Title>
              <Description>{shop.address}</Description>
            </div>
            <Grid container justify="flex-end">
              <StyledLink to={'/shops/' + shop.id.toString() + '/edit'}>
                <Button variant="outlined" style={{ marginRight: 10 }}>
                  編集
                </Button>
              </StyledLink>
              <StyledLink to={'/shops/' + shop.id.toString() + '/delete'}>
                <Button variant="outlined" color="secondary">
                  削除
                </Button>
              </StyledLink>
            </Grid>
          </Block>
        </Section>
        <Section>
          <Title>取扱商品</Title>
          {this.state.shop.stocks && (
            <ProductList
              products={
                this.state.shop.stocks.map(
                  stock => stock.product
                ) as ProductDto[]
              }
            />
          )}
        </Section>
        <Loading loading={this.state.loading} />
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

const Block = styled.div`
  flex: 1;
  min-width: 300px;
`

export default ShopDetailScreen
