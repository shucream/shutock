import React from 'react'
import styled from 'styled-components'

interface Props {}

class SearchResultScreen extends React.Component<Props, {}> {
  public render() {
    return (
      <Background>
        <p>search result</p>
      </Background>
    )
  }
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default SearchResultScreen
