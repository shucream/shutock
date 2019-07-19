import React from 'react'
import styled from 'styled-components'
import ApiClient from '../lib/ApiClient'
import { ShopDto } from '../dto/ShopDto'
import ShopList from '../components/organisms/ShopList'
import Section from '../components/atoms/Section'

interface Props {}

interface State {
  results: ShopDto[]
}

class ShopListScreen extends React.Component<Props, State> {
  public state: State = {
    results: []
  }

  public componentDidMount(): void {
    ApiClient.get<ShopDto[]>('/v1/shops/').then(response => {
      if (response.success) {
        console.log(response.data)
        this.setState({ results: response.data })
      }
    })
  }

  public render() {
    return (
      <Background>
        <Section>全店鋪</Section>
        <Section>
          <ShopList shops={this.state.results} />
        </Section>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default ShopListScreen
