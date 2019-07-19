import React from 'react'
import { Button, TextField } from '@material-ui/core'
import Title from '../components/atoms/Title'
import ImageDropZone from '../components/molecules/ImageDropZone'
import Description from '../components/atoms/Description'
import Section from '../components/atoms/Section'
import Container from '../components/atoms/Container'
import ApiClient from '../lib/ApiClient'

interface Props {}

interface State {
  name: string
  address: string
  images: File[]
}

class ShopRegisterScreen extends React.Component<Props, State> {
  public state: State = {
    name: '',
    address: '',
    images: []
  }

  public render() {
    return (
      <Container>
        <Section>
          <Title>Add New Shop</Title>
          <Description>新しい店舗を登録します。</Description>
        </Section>
        <Section>
          <TextField
            label="店舗名"
            value={this.state.name}
            onChange={this.handleChange('name').bind(this)}
            margin="normal"
            style={{ marginTop: 0, maxWidth: 300 }}
          />
          <TextField
            label="住所"
            value={this.state.address}
            onChange={this.handleChange('address').bind(this)}
            multiline
            margin="normal"
          />
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
          <Button variant="outlined" onClick={this.submit}>
            保存
          </Button>
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

  private submit = () => {
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('address', this.state.address)
    this.state.images.forEach(image => {
      formData.append('images[]', image)
    })
    ApiClient.postData('/v1/shops/', formData).then(response => {
      if (response.success) {
        console.log(response.data)
      } else {
        console.log(response.detail)
      }
    })
  }
}

export default ShopRegisterScreen
