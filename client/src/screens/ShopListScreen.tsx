import React from 'react'
import styled from 'styled-components'
import ApiClient from '../lib/ApiClient'
import { ShopDto } from '../dto/ShopDto'
import ShopList from '../components/organisms/ShopList'
import Section from '../components/atoms/Section'
import Loading from '../components/atoms/Loading'

interface Props {}

interface State {
  results: ShopDto[]
  loading: boolean
}

class ShopListScreen extends React.Component<Props, State> {
  public state: State = {
    results: [],
    loading: false
  }

  public async componentDidMount() {
    const response = await ApiClient.get<ShopDto[]>('/v1/shops/')
    if (response.success) {
      this.setState({ results: response.data })
    } else {
      console.log(response.detail)
    }
  }

  public render() {
    return (
      <Background>
        <Section>全店鋪</Section>
        <Section>
          <ShopList shops={this.state.results} />
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

export default ShopListScreen
