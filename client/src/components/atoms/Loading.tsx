import React from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

interface Props {
  loading: boolean
  size?: number
}

const Loading: React.FC<Props> = props => {
  const { loading, size } = props
  if (loading) {
    return (
      <Wrapper>
        <CircularProgress size={size} />
      </Wrapper>
    )
  } else {
    return null
  }
}

const Wrapper = styled.div`
  position: absolute;
  background-color: #f5f5f5;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Loading
