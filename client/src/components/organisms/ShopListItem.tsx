import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core'
import StyledLink from '../atoms/StyledLink'
import { ShopDto } from '../../dto/ShopDto'

interface Props {
  shop: ShopDto
}

const ShopListItem: React.FC<Props> = props => {
  const { shop } = props

  return (
    <Card style={{ width: 300, margin: 10 }}>
      <StyledLink to={'/shops/' + shop.id.toString()}>
        <CardActionArea>
          <CardMedia
            image={shop.shop_images[0].thumbnail}
            style={{ height: 0, paddingTop: '56.25%' }}
          />
          <CardContent>
            <Grid>
              <Typography variant="body1" component="p">
                {shop.name}
              </Typography>
            </Grid>
            <Typography variant="body2" color="textSecondary" component="p">
              {shop.address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </StyledLink>
    </Card>
  )
}

export default ShopListItem
