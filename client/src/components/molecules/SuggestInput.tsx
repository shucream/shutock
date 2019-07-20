import React from 'react'
import styled from 'styled-components'
import { MenuItem, Paper, Popper, TextField } from '@material-ui/core'
import _ from 'lodash'
import ApiClient from '../../lib/ApiClient'
import { ShopDto } from '../../dto/ShopDto'

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
}

const ENTER_KEY = 13

/***
 * サジェスト機能を持ったTextInputです
 * APIからのレスポンスが
 * Response :{id: number, name: stirng}[]
 * を持つ必要があります。
 */
export default class SuggestInput extends React.Component<Props, State> {
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
            {this.state.entities.length || (
              <MenuItem>候補がありません</MenuItem>
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
    _.throttle(this.search.bind(this), 700)
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
    const response = await ApiClient.get<Entity[]>(
      `${this.props.suggestApiPath}?q=${this.state.value}`
    )
    if (response.success) {
      this.setState({ entities: response.data })
    } else {
      console.log(response.detail)
    }
  }

  private handleDecide = (entity: Entity) => () => {
    this.setState({ targetEntity: entity })
    this.close()
    this.props.submit(entity)
  }
}

const Background = styled.div`
  flex: 1;
`
