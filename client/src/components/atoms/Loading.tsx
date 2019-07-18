import React from 'react'
import { StyleSheet } from 'react-native'

const Loading: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'glay',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
    >
      loading
    </div>
  )
}

export default Loading
