import React from 'react'
import { Button, TextField } from '@material-ui/core'
import Container from '../components/atoms/Container'
import Title from '../components/atoms/Title'
import Description from '../components/atoms/Description'
import Section from '../components/atoms/Section'
import TextFieldRow from '../components/atoms/TextFieldRow'
import ImageDropZone from '../components/molecules/ImageDropZone'

interface Props {}

interface State {
  name: string
  description: string
  price: number | null
  images: File[]
}

class ProductRegisterScreen extends React.Component<Props, State> {
  public state: State = {
    name: '',
    description: '',
    price: null,
    images: []
  }

  public render() {
    return (
      <Container>
        <Section>
          <Title>Add New Product</Title>
          <Description>新しい商品を登録します。</Description>
        </Section>
        <Section>
          <TextField
            label="商品名"
            value={this.state.name}
            onChange={this.handleChange('name').bind(this)}
            margin="normal"
            style={{ marginTop: 0, maxWidth: 300 }}
          />
          <TextField
            label="説明文"
            value={this.state.description}
            onChange={this.handleChange('description').bind(this)}
            multiline
            margin="normal"
          />
          <TextFieldRow>
            <TextField
              label="価格"
              value={this.state.price}
              onChange={this.handleChange('price').bind(this)}
              margin="normal"
              style={{ marginTop: 0, maxWidth: 100 }}
            />
            <span>円</span>
          </TextFieldRow>
        </Section>
        <Section>
          <Title>画像アップロード</Title>
          <Description>複数枚アップロードできます。</Description>
          <ImageDropZone
            onDrop={this.onDrop.bind(this)}
            images={this.state.images}
            multiple={true}
          />
        </Section>
        <Section>
          <Button variant="outlined">保存</Button>
        </Section>
      </Container>
    )
  }

  private onDrop = (acceptedFiles: File[]) => {
    this.setState({ images: this.state.images.concat(acceptedFiles) })
  }

  private handleChange = (key: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (typeof this.state[key] === 'string') {
      // @ts-ignore
      this.setState({ [key]: event.target.value.toString() })
    }
    if (typeof this.state[key] === 'number') {
      // @ts-ignore
      this.setState({ [key]: Number.parseInt(event.target.value) })
    }
  }
}

export default ProductRegisterScreen
