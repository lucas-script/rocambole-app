import React from 'react'
import { connect } from 'react-redux'
import Login from '../login/login'
import App from '../app/App'

class AppOrLogin extends React.Component {

	render = () => {
		if (this.props.isLogged === true) {
			return (
				<App />
			)
		} else {
			return (
				<Login />
			)
		}
	}
}

export default connect( state => ({
	isLogged: state.login.isLogged
}))(AppOrLogin)