import React from 'react'
import styled from 'styled-components'
import {
  Button,
  IconButton,
  InputBase,
  Paper,
  Link as UILink,
  MenuItem,
  Menu
} from '@material-ui/core'
import { Add, Search } from '@material-ui/icons'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { parse } from 'query-string'

type Props = RouteComponentProps

interface State {
  searchValue: string
  menu: HTMLButtonElement | null
}

const ENTER_KEY = 13

class Header extends React.Component<Props, State> {
  public state: State = {
    searchValue: (parse(this.props.location.search).q || '').toString(),
    menu: null
  }

  public render() {
    console.log(this.state.searchValue)
    return (
      <Background>
        <Title to={'/'}>shutock</Title>
        <RightContents>
          <Paper
            style={{
              paddingLeft: 10,
              marginLeft: 10,
              marginRight: 10,
              display: 'flex',
              flex: 1
            }}
          >
            <InputBase
              placeholder="Search…"
              value={this.state.searchValue}
              onChange={this.handleSearchInput.bind(this)}
              onKeyDown={this.handleEnterKey.bind(this)}
              style={{ flex: 1 }}
            />
            <IconButton onClick={this.handleSubmit.bind(this)}>
              <Search />
            </IconButton>
          </Paper>
          <IconButton onClick={this.handleMenu.bind(this)}>
            <Add />
          </IconButton>
          <Menu
            anchorEl={this.state.menu}
            keepMounted
            open={Boolean(this.state.menu)}
            onClose={this.handleClose.bind(this)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            getContentAnchorEl={null}
          >
            <Link
              to={'/products/new'}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuItem>add Product</MenuItem>
            </Link>
            <Link
              to={'/shops/new'}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuItem>add Shop</MenuItem>
            </Link>
          </Menu>
        </RightContents>
      </Background>
    )
  }

  private handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: event.target.value.toString() })
  }

  private handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === ENTER_KEY) {
      this.handleSubmit()
    }
  }

  private handleSubmit() {
    if (this.state.searchValue !== '') {
      this.props.history.push('/search?q=' + this.state.searchValue)
    }
  }

  private handleMenu(event: React.MouseEvent<HTMLButtonElement>) {
    this.setState({ menu: event.currentTarget })
  }

  private handleClose() {
    this.setState({ menu: null })
  }
}

const Background = styled.div`
  height: 60px;
  background-color: #ccc;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5em;
  padding-right: 0.5em;
`

const Title = styled(Link)`
  font-size: 1.8em;
  font-weight: 200;
  color: #fff;
  text-decoration: none;
`

const RightContents = styled.div`
  display: flex;
  flex: 1;
  max-width: 400px;
`

export default withRouter(Header)
