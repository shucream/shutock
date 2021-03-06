import React from 'react'
import styled from 'styled-components'

interface Props {}

class NotFoundScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <p>404 Not Found</p>
      </Background>
    )
  }
}
const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default NotFoundScreen
