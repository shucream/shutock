import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'

type Props = RouteComponentProps

class SearchResultScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <p>aaa</p>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
  background-color: red;
`

export default SearchResultScreen
