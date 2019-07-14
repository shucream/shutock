import React from 'react'
import styled from 'styled-components'
import {
  Button,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from '@material-ui/core'
import Dropzone from 'react-dropzone'

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
      <Background>
        <Section>
          <Title>Add New Product</Title>
          <Description>新しい商品を登録します。</Description>
        </Section>
        <Section>
          <TextField
            label="商品名"
            // value={values.name}
            // onChange={handleChange('name')}
            margin="normal"
            style={{ marginTop: 0, maxWidth: 300 }}
          />
          <TextField label="説明文" multiline margin="normal" />
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <TextField
              label="価格"
              // value={values.name}
              // onChange={handleChange('name')}
              margin="normal"
              style={{ marginTop: 0, maxWidth: 100 }}
            />
            <span>円</span>
          </div>
        </Section>
        <Section>
          <Title>画像アップロード</Title>
          <Description>複数枚アップロードできます。</Description>
          <Dropzone
            onDrop={this.onDrop.bind(this)}
            accept="image/png, image/jpeg"
            multiple
          >
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <div
                {...getRootProps()}
                style={{
                  display: 'flex',
                  backgroundColor: '#eee',
                  height: 200,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <input {...getInputProps()} />
                {!this.state.images.length && !isDragActive && (
                  <span>クリック or ドラックでアップロード</span>
                )}
                {!this.state.images.length && isDragActive && !isDragReject && (
                  <span>アップロードできます</span>
                )}
                {!this.state.images.length && isDragReject && (
                  <span style={{ color: 'red' }}>
                    対応していないファイルです。
                  </span>
                )}
                {Boolean(this.state.images.length) &&
                  this.state.images.map(image => (
                    <p key={image.name}>{image.name}</p>
                  ))}
              </div>
            )}
          </Dropzone>
        </Section>
        <Section>
          <Title>店舗と在庫</Title>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <TextField
              label="店舗名"
              // value={values.name}
              // onChange={handleChange('name')}
              margin="normal"
              style={{ flex: 1, marginTop: 0, maxWidth: 400, marginRight: 10 }}
            />
            <TextField
              label="個数"
              // value={values.name}
              // onChange={handleChange('name')}
              margin="normal"
              style={{ flex: 1, marginTop: 0, maxWidth: 100 }}
            />
            <span>個</span>
          </div>
        </Section>
        <Section>
          <Button>保存</Button>
        </Section>
      </Background>
    )
  }

  private onDrop = (acceptedFiles: File[]) => {
    this.setState({ images: this.state.images.concat(acceptedFiles) })
  }
}
const Background = styled.div`
  max-width: 700px;
  height: 100px;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: normal;
  margin-top: 3px;
  margin-bottom: 3px;
`

const Description = styled.h2`
  font-size: 14px;
  font-weight: normal;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: rgb(225, 228, 232);
  border-bottom-style: solid;
`

export default ProductRegisterScreen
