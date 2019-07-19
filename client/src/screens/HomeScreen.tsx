import React from 'react'
import styled from 'styled-components'
import Section from '../components/atoms/Section'
import StyledLink from '../components/atoms/StyledLink'

interface Props {}

class HomeScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <Section>
          <StyledLink to={'/products'}>全商品一覧</StyledLink>
        </Section>
        <Section>
          <StyledLink to={'/shops'}>全店鋪一覧</StyledLink>
        </Section>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default HomeScreen
