import React from 'react'
import styled from 'styled-components'

interface Props {}

class StockRegisterScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <p>stock new</p>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default StockRegisterScreen
