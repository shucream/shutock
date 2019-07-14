import React from 'react'
import styled from 'styled-components'
import {
  Button,
  IconButton,
  InputBase,
  Paper,
  Link as UILink
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

type Props = RouteComponentProps

interface State {
  search: string
}

const ENTER_KEY = 13

class Header extends React.Component<Props, State> {
  public state = {
    search: ''
  }

  public render() {
    return (
      <Background>
        <Title to={'/'}>shutock</Title>
        <Paper style={{ paddingLeft: 10 }}>
          <InputBase
            placeholder="Search…"
            onChange={this.handleSearchInput.bind(this)}
            onKeyDown={this.handleEnterKey.bind(this)}
            style={{ flex: 1 }}
          />
          <IconButton onClick={this.handleSubmit.bind(this)}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Background>
    )
  }

  private handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: event.target.value.toString() })
    console.log(event.target.value)
  }

  private handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === ENTER_KEY) {
      this.handleSubmit()
    }
  }

  private handleSubmit() {
    this.props.history.push('/search?q=' + this.state.search)
  }
}

const Background = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled(Link)`
  font-size: 1.8em;
  font-weight: 200;
  padding-left: 0.5em;
  color: #fff;
  text-decoration: none;
`

export default withRouter(Header)
