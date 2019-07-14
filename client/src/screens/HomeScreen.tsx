import React from 'react'
import styled from 'styled-components'

interface Props {}

class HomeScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <p>home</p>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default HomeScreen
