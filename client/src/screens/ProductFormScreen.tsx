import React from 'react'
import { Button, TextField } from '@material-ui/core'
import Container from '../components/atoms/Container'
import Title from '../components/atoms/Title'
import Description from '../components/atoms/Description'
import Section from '../components/atoms/Section'
import TextFieldRow from '../components/atoms/TextFieldRow'
import ImageDropZone from '../components/molecules/ImageDropZone'
import ApiClient from '../lib/ApiClient'
import { RouteComponentProps } from 'react-router'
import { ProductDto, ProductImageDto } from '../dto/ProductDto'

type Props = RouteComponentProps<{ id?: string }>

interface State {
  name: string
  description: string
  price: string
  images: File[]
  imageList: ProductImageDto[]
  config: ModeConfig
}

interface Mode {
  new: ModeConfig
  edit: ModeConfig
}

interface ModeConfig {
  title: string
  subtitle: string
  submitLabel: string
  preset: boolean
}

const modeConfig: Mode = {
  new: {
    title: '新規商品登録',
    subtitle: '新しい商品を登録します。',
    submitLabel: '登録',
    preset: false
  },
  edit: {
    title: '商品編集',
    subtitle: '商品の情報を更新します。',
    submitLabel: '更新',
    preset: true
  }
}

const initialState: State = {
  name: '',
  description: '',
  price: '',
  images: [],
  imageList: [],
  config: modeConfig.new
}

class ProductFormScreen extends React.Component<Props, State> {
  public state: State = initialState

  componentDidMount(): void {
    if (this.props.match.params.id) {
      this.setState({ config: modeConfig.edit })
      ApiClient.get<ProductDto>(
        `/v1/products/${this.props.match.params.id.toString()}`
      ).then(response => {
        if (response.success) {
          this.setState({
            name: response.data.name,
            description: response.data.description,
            price: response.data.price.toString(),
            images: [],
            imageList: response.data.product_images
          })
        } else {
          console.log(response.detail)
        }
      })
    }
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState(initialState)
    }
  }

  public render() {
    return (
      <Container>
        <Section>
          <Title>{this.state.config.title}</Title>
          <Description>{this.state.config.subtitle}</Description>
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
          <Button variant="outlined" onClick={this.submit}>
            {this.state.config.submitLabel}
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
    console.log(this.state)
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('description', this.state.description)
    formData.append('price', this.state.price.toString())
    this.state.images.forEach(file => {
      formData.append('images[]', file)
    })
    if (this.props.match.params.id) {
      ApiClient.patchData(
        `/v1/products/${this.props.match.params.id}`,
        formData
      ).then(response => {
        if (response.success) {
          console.log(response.data)
        } else {
          console.log(response.detail)
        }
      })
    } else {
      ApiClient.postData('/v1/products/', formData).then(response => {
        if (response.success) {
          console.log(response.data)
        } else {
          console.log(response.detail)
        }
      })
    }
  }
}

export default ProductFormScreen
