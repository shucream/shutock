import React from 'react'
import styled from 'styled-components'

interface Props {}

class ShopDetailScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <p>shop detail</p>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default ShopDetailScreen
