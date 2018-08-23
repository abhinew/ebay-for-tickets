import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router'
import {userId} from '../../jwt'
import {connect} from 'react-redux'


const TopBar = (props) => {
  const { history, user } = props

  return (
    <AppBar position="absolute" style={{zIndex:10}}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{flex: 1}}>
          Ticketmaster
        </Typography>
        {
          user &&
          <Button color="inherit">{ user.firstName }</Button>
        }

        {
          
          <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          
          <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          
          <Button color="inherit" onClick={() => history.push('/events')}>All Events</Button>
        }
        {
         
          <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => {


  return {
    user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
  }

}
  

export default withRouter(
  connect(mapStateToProps)(TopBar)
)
