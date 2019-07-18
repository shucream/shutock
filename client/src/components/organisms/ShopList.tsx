import React from 'react'
import ShopListItem from './ShopListItem'
import { ShopDto } from '../../dto/ShopDto'

interface Props {
  shops: ShopDto[]
}

const ShopList: React.FC<Props> = props => {
  const { shops } = props

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      {shops.map(shop => (
        <ShopListItem shop={shop} />
      ))}
    </div>
  )
}

export default ShopList
