import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {login} from '../../actions/users'
import Signin from './SigninForm'
import {Redirect} from 'react-router-dom'

class LoginPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.login(data.email, data.password)
	}

	render() {

		if (this.props.currentUser) return (
			<Redirect to="/" />
		)

		return (
			<div>
				
				<Signin onSubmit={this.handleSubmit} />
        { this.props.error && 
          <span style={{color:'red'}}>{this.props.error}</span> }
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		authenticated: state.currentUser !== null,
  		users: state.users === null ? null : state.users,
		currentUser: state.currentUser,
    	error: state.login.error
	}
}

export default connect(mapStateToProps, {login, })(LoginPage)
