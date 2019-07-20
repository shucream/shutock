import React from 'react'
import { Button, TextField } from '@material-ui/core'
import Container from '../components/atoms/Container'
import Title from '../components/atoms/Title'
import Description from '../components/atoms/Description'
import Section from '../components/atoms/Section'
import TextFieldRow from '../components/atoms/TextFieldRow'
import ImageDropZone from '../components/molecules/ImageDropZone'
import ApiClient from '../lib/ApiClient'
import { RouteComponentProps, withRouter } from 'react-router'
import { ProductDto, ProductImageDto } from '../dto/ProductDto'
import { FailureResponse } from '../lib/FailureResponse'
import { SuccessResponse } from '../lib/SuccessResponse'

type Props = RouteComponentProps<{ id?: string }>

interface State {
  name: string
  description: string
  price: string
  images: File[]
  imageList: ProductImageDto[]
  mode: Mode
  loading: boolean
}

enum Mode {
  new,
  edit
}

interface ModeConfig {
  title: string
  subtitle: string
  submitLabel: string
}

const ModeData: { [key: string]: ModeConfig } = {
  [Mode.new]: {
    title: '新規商品登録',
    subtitle: '新しい商品を登録します。',
    submitLabel: '登録'
  },
  [Mode.edit]: {
    title: '商品編集',
    subtitle: '商品の情報を更新します。',
    submitLabel: '更新'
  }
}

const initialState: State = {
  name: '',
  description: '',
  price: '',
  images: [],
  imageList: [],
  mode: Mode.new,
  loading: false
}

class ProductFormScreen extends React.Component<Props, State> {
  public state: State = initialState

  public async componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ mode: Mode.edit, loading: true })
      const response = await ApiClient.get<ProductDto>(
        `/v1/products/${this.props.match.params.id.toString()}`
      )
      if (response.success) {
        const product = response.data
        this.setState({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          images: [],
          imageList: response.data.product_images,
          loading: false
        })
      } else {
        console.log(response.detail)
      }
    }
  }

  public componentDidUpdate(prevProps: Readonly<Props>): void {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState(initialState)
    }
  }

  public render() {
    return (
      <Container>
        <Section>
          <Title>{ModeData[this.state.mode].title}</Title>
          <Description>{ModeData[this.state.mode].subtitle}</Description>
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
            {ModeData[this.state.mode].submitLabel}
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
    // @ts-ignore
    this.setState({ [key]: event.target.value })
  }

  private submit = async () => {
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('description', this.state.description)
    formData.append('price', this.state.price.toString())
    this.state.images.forEach(file => {
      formData.append('images[]', file)
    })
    let response: FailureResponse | SuccessResponse<ProductDto>
    if (this.props.match.params.id) {
      response = await ApiClient.patchData<ProductDto>(
        `/v1/products/${this.props.match.params.id}`,
        formData
      )
    } else {
      response = await ApiClient.postData<ProductDto>('/v1/products/', formData)
    }
    this.setState({ loading: false })
    if (response.success) {
      const productId = response.data.id
      this.props.history.push(`/products/${productId}`)
    } else {
      console.log(response.detail)
    }
  }
}

export default withRouter(ProductFormScreen)
