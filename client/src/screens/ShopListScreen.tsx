import React from 'react'
import styled from 'styled-components'

interface Props {}

const ShopListScreen: React.FC<Props> = () => {
  return (
    <Background>
      <p>shop list</p>
    </Background>
  )
}

const Background = styled.div`
  width: 100%;
  height: 100px;
`

export default ShopListScreen
