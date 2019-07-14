import React from 'react'
import Dropzone, { DropEvent } from 'react-dropzone'

interface Props {
  onDrop: (
    acceptedFiles: File[],
    rejectedFiles: File[],
    event: DropEvent
  ) => void
  images: File[]
  multiple: boolean
}

const ImageDropZone: React.FC<Props> = props => (
  <Dropzone
    onDrop={props.onDrop}
    accept="image/png, image/jpeg"
    multiple={props.multiple}
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
        {!props.images.length && !isDragActive && (
          <span>クリック or ドラックでアップロード</span>
        )}
        {!props.images.length && isDragActive && !isDragReject && (
          <span>アップロードできます</span>
        )}
        {!props.images.length && isDragReject && (
          <span style={{ color: 'red' }}>対応していないファイルです。</span>
        )}
        {Boolean(props.images.length) &&
          props.images.map(image => <p key={image.name}>{image.name}</p>)}
      </div>
    )}
  </Dropzone>
)

export default ImageDropZone
