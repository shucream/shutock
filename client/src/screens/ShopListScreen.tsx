import React from 'react'
import styled from 'styled-components'

interface Props {}

class ShopListScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <p>shop list</p>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default ShopListScreen
