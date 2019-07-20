import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

interface Props {}

class NotFoundScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <Typography>404 Not Found</Typography>
      </Background>
    )
  }
}
const Background = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-contents: center;
`

export default NotFoundScreen
