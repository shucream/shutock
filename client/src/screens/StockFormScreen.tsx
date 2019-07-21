import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import Section from '../components/atoms/Section'
import Title from '../components/atoms/Title'
import Container from '../components/atoms/Container'
import { ProductDto } from '../dto/ProductDto'
import { ShopDto } from '../dto/ShopDto'
import { Button, MenuItem, Paper, Popper, TextField } from '@material-ui/core'
import ApiClient from '../lib/ApiClient'
import _ from 'lodash'
import SuggestInput from '../components/molecules/SuggestInput'
import { RouteComponentProps, RouterProps, withRouter } from 'react-router'

type Props = RouteComponentProps

interface State {
  product: ProductDto | null
  shop: ShopDto | null
  quantity: string
}

class StockFormScreen extends React.Component<Props, State> {
  public state: State = {
    product: null,
    shop: null,
    quantity: ''
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
              <SuggestInput
                label="店鋪名"
                submit={this.handleShopId.bind(this)}
                suggestApiPath={'/v1/search/shops'}
                style={{ marginTop: 0, maxWidth: 300 }}
              />
            </Block>
            <Block>
              <SuggestInput
                label="商品名"
                submit={this.handleProductId.bind(this)}
                suggestApiPath={'/v1/search/products'}
                style={{ marginTop: 0, maxWidth: 300 }}
              />
            </Block>
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

  private handleShopId = (entity: any) => {
    this.setState({ shop: entity as ShopDto })
  }

  private handleProductId = (entity: any) => {
    this.setState({ product: entity as ProductDto })
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
          this.props.history.push('/')
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

export default withRouter(StockFormScreen)
