import React from 'react'
import { Button, TextField } from '@material-ui/core'
import Title from '../components/atoms/Title'
import ImageDropZone from '../components/molecules/ImageDropZone'
import Description from '../components/atoms/Description'
import Section from '../components/atoms/Section'
import Container from '../components/atoms/Container'
import ApiClient from '../lib/ApiClient'
import { RouteComponentProps } from 'react-router';
import { ShopDto, ShopImageDto } from '../dto/ShopDto';

type Props = RouteComponentProps<{id?: string}>;

interface State {
  name: string
  address: string
  images: File[]
  imageList: ShopImageDto[]
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
    title: '新規店鋪登録',
    subtitle: '新しい店鋪を登録します。',
    submitLabel: '登録',
    preset: false,
  },
  edit: {
    title: '店鋪編集',
    subtitle: '店鋪の情報を更新します。',
    submitLabel: '更新',
    preset: true
  }
}

const initialState: State = {
  name: '',
  address: '',
  images: [],
  imageList: [],
  config: modeConfig.new
}

class ShopFormScreen extends React.Component<Props, State> {
  public state: State = initialState

  componentDidMount(): void {
    if (this.props.match.params.id) {
      this.setState({config: modeConfig.edit})
      ApiClient.get<ShopDto>(`/v1/shops/${this.props.match.params.id.toString()}`)
        .then(response => {
          if (response.success) {
            this.setState({
              name: response.data.name,
              address: response.data.address,
              images: [],
              imageList: response.data.shop_images
            })
          } else {
            console.log(response.detail)
          }
        })
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
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
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('address', this.state.address)
    this.state.images.forEach(image => {
      formData.append('images[]', image)
    })
    if (this.props.match.params.id) {
      ApiClient.patchData(`/v1/shops/${this.props.match.params.id}`, formData).then(response => {
        if (response.success) {
          console.log(response.data)
        } else {
          console.log(response.detail)
        }
      })
    } else { ApiClient.postData('/v1/shops/', formData).then(response => {
      if (response.success) {
        console.log(response.data)
      } else {
        console.log(response.detail)
      }
    })}
  }
}

export default ShopFormScreen
