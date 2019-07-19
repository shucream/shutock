import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import Section from '../components/atoms/Section'
import Title from '../components/atoms/Title'
import Container from '../components/atoms/Container'
import { ProductDto } from '../dto/ProductDto'
import { ShopDto } from '../dto/ShopDto'
import {
  Button,
  Menu,
  MenuItem,
  Paper,
  Popper,
  TextField
} from '@material-ui/core'
import ApiClient from '../lib/ApiClient'
import _ from 'lodash'

interface Props {}

interface State {
  product: ProductDto | null
  productValue: string
  productList: ProductDto[]
  shop: ShopDto | null
  shopValue: string
  shopList: ShopDto[]
  quantity: string
  activeInput: any | null
  activeInputType: '' | 'product' | 'shop'
}

const ENTER_KEY = 13

class StockFormScreen extends React.Component<Props, State> {
  public state: State = {
    product: null,
    productValue: '',
    productList: [],
    shop: null,
    shopValue: '',
    shopList: [],
    quantity: '',
    activeInput: null,
    activeInputType: ''
  }

  public render() {
    return (
      <Background>
        <Container>
          <Section>
            <Title>在庫管理</Title>
          </Section>
          <Section style={{ flexDirection: 'row' }}>
            <Block>
              <TextField
                label="店鋪名"
                value={
                  (this.state.shop && this.state.shop.name) ||
                  this.state.shopValue
                }
                onChange={this.handleShopValue.bind(this)}
                onKeyDown={this.handleEnterKey('shop').bind(this)}
                margin="normal"
                style={{ marginTop: 0, maxWidth: 300 }}
              />
            </Block>
            <Block>
              <TextField
                label="商品名"
                value={
                  (this.state.product && this.state.product.name) ||
                  this.state.productValue
                }
                onChange={this.handleProductValue.bind(this)}
                onKeyDown={this.handleEnterKey('product').bind(this)}
                margin="normal"
                style={{ marginTop: 0, maxWidth: 300 }}
              />
            </Block>
            <Popper
              anchorEl={this.state.activeInput}
              open={Boolean(this.state.activeInput)}
            >
              <Paper
                square
                style={{
                  marginTop: 8,
                  width: this.state.activeInput
                    ? this.state.activeInput.clientWidth
                    : undefined
                }}
              >
                {(this.state.activeInputType === 'shop' &&
                  this.state.shopList.map(suggestion => (
                    <MenuItem onClick={this.handleShopAutoComplete(suggestion)}>
                      {suggestion.name}
                    </MenuItem>
                  ))) ||
                  (this.state.activeInputType === 'product' &&
                    this.state.productList.map(suggestion => (
                      <MenuItem
                        onClick={this.handleProductAutoComplete(suggestion)}
                      >
                        {suggestion.name}
                      </MenuItem>
                    )))}
              </Paper>
            </Popper>
          </Section>
          <Section>
            <Block>
              <TextField
                label="数量"
                value={this.state.quantity}
                onChange={this.handleQuantity.bind(this)}
                margin="normal"
                style={{ marginTop: 0, maxWidth: 300 }}
              />
            </Block>
          </Section>
          <Section>
            <Block>
              <Button variant={'outlined'} onClick={this.submit.bind(this)}>
                登録
              </Button>
            </Block>
          </Section>
        </Container>
      </Background>
    )
  }

  public handleShopValue = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      shopValue: event.target.value,
      activeInput: event.currentTarget,
      activeInputType: 'shop'
    })
    console.log(this.state)
    _.throttle(this.searchShop.bind(this), 700)
  }

  public handleProductValue = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      productValue: event.target.value,
      activeInput: event.currentTarget,
      activeInputType: 'product'
    })
    console.log(this.state)
    _.throttle(this.searchProduct.bind(this), 700)
  }

  public searchShop = () => {
    ApiClient.get<ShopDto[]>(`/v1/search/shops?q=${this.state.shopValue}`).then(
      response => {
        if (response.success) {
          console.log(response)
          this.setState({ shopList: response.data })
        } else {
          console.log(response.detail)
        }
      }
    )
  }

  public searchProduct = () => {
    ApiClient.get<ProductDto[]>(
      `/v1/search/products?q=${this.state.productValue}`
    ).then(response => {
      if (response.success) {
        console.log(response)
        this.setState({ productList: response.data })
      } else {
        console.log(response.detail)
      }
    })
  }

  private handleShopAutoComplete = (data: ShopDto) => () => {
    this.setState({ shop: data, activeInputType: '' })
  }

  private handleProductAutoComplete = (data: ProductDto) => () => {
    this.setState({ product: data, activeInputType: '' })
  }

  private handleClose() {
    this.setState({ activeInput: null, shopList: [], productList: [] })
  }

  private handleEnterKey = (target: 'shop' | 'product') => (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.keyCode === ENTER_KEY) {
      this.setState({ activeInputType: target })
      if (target === 'shop') {
        this.searchShop()
      } else {
        this.searchProduct()
      }
    }
  }

  private handleQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ quantity: event.target.value })
  }

  private submit = () => {
    if (
      this.state.product &&
      this.state.shop &&
      Number.parseInt(this.state.quantity)
    ) {
      const json = {
        product_id: this.state.product.id,
        shop_id: this.state.shop.id,
        quantity: this.state.quantity
      }
      ApiClient.post('/v1/stocks', json).then(response => {
        if (response.success) {
          console.log(response.data)
        } else {
          console.log(response.detail)
        }
      })
    }
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

export default StockFormScreen
