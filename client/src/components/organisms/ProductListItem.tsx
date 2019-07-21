import React from 'react'
import { ProductDto } from '../../dto/ProductDto'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core'
import StyledLink from '../atoms/StyledLink'

interface Props {
  product: ProductDto
}

const ProductListItem: React.FC<Props> = props => {
  const { product } = props

  return (
    <StyledLink to={'/products/' + product.id.toString()}>
      <Card style={{ width: 300, margin: 10 }}>
        <CardActionArea>
          <CardMedia
            image={
              product.product_images &&
              product.product_images[0] &&
              product.product_images[0].thumbnail
            }
            style={{ height: 0, paddingTop: '56.25%' }}
          />
          <CardContent>
            <Grid>
              <Typography variant="body1" component="p">
                {product.name}
              </Typography>
              <span>{product.price}円</span>
            </Grid>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </StyledLink>
  )
}

export default ProductListItem
