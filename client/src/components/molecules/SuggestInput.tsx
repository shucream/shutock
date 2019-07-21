import React from 'react'
import styled from 'styled-components'
import { MenuItem, Paper, Popper, TextField } from '@material-ui/core'
import _ from 'lodash'
import ApiClient from '../../lib/ApiClient'
import Loading from '../atoms/Loading'
import { CheckCircleOutline } from '@material-ui/icons'

interface Entity {
  id: number
  name: string
  [key: string]: any
}

interface Props {
  label: string
  suggestApiPath: string
  submit: (entity: Entity) => void
  style?: React.CSSProperties
}

interface State {
  value: string
  targetEntity: Entity | null
  entities: Entity[]
  targetElement: HTMLInputElement | null
  loading: boolean
}

const ENTER_KEY = 13

/***
 * サジェスト機能を持ったTextInputです
 * APIからのレスポンスが
 * Response :{id: number, name: stirng}[]
 * を持つ必要があります。
 */
export default class SuggestInput extends React.Component<Props, State> {
  public state: State = {
    value: '',
    targetEntity: null,
    entities: [],
    targetElement: null,
    loading: false
  }

  public render() {
    return (
      <Background style={this.props.style}>
        <TextField
          label={this.props.label}
          value={
            (this.state.targetEntity && this.state.targetEntity.name) ||
            this.state.value
          }
          onChange={this.handleValue.bind(this)}
          onKeyDown={this.handleEnterKey.bind(this)}
          margin="normal"
          style={{ marginTop: 0, maxWidth: 300 }}
        />
        <CheckCircleOutline
          color={Boolean(this.state.targetEntity) ? 'primary' : 'disabled'}
        />
        <Popper
          anchorEl={this.state.targetElement}
          open={Boolean(this.state.targetElement)}
        >
          <Paper
            square
            style={{
              marginTop: 8,
              width: this.state.targetElement
                ? this.state.targetElement.clientWidth
                : undefined
            }}
          >
            {this.state.entities.map(suggestionEntity => (
              <MenuItem onClick={this.handleDecide(suggestionEntity)}>
                {suggestionEntity.name}
              </MenuItem>
            ))}
            {this.state.entities.length ? null : (
              <MenuItem>
                <Loading loading={this.state.loading} size={30} />
              </MenuItem>
            )}
          </Paper>
        </Popper>
      </Background>
    )
  }

  private handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
      targetElement: event.currentTarget
    })
    _.debounce(this.search.bind(this), 500)()
  }

  private handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === ENTER_KEY) {
      this.search.bind(this)()
    }
  }

  private close() {
    this.setState({ entities: [], targetElement: null })
  }

  private search = async () => {
    this.setState({ loading: true })
    const response = await ApiClient.get<Entity[]>(
      `${this.props.suggestApiPath}?q=${this.state.value}`
    )
    if (response.success) {
      this.setState({ entities: response.data })
    } else {
      console.log(response.detail)
    }
    this.setState({ loading: false })
  }

  private handleDecide = (entity: Entity) => () => {
    this.setState({ targetEntity: entity })
    this.close()
    this.props.submit(entity)
  }
}

const Background = styled.div`
  flex: 1;
  display: flex
  flex-direction: row;
  align-items: center;
  jusitfy-content: flex-start;
`
