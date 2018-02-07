import React from 'react'
import { connect } from 'react-redux'
import { tokenAuthentication } from './login-actions'
import Toastr from '../template/toastr'
import { toastr } from 'react-redux-toastr'
import BlockUi from 'react-block-ui'

class Login extends React.Component {

	loginHandler = () => {
		const { token } = this.refs
		if (token.value !== '') {
			this.props.dispatch(tokenAuthentication(token.value))
		} else {
			toastr.error('Authentication', "I can't authenticate using username/password yet, please provide a valid token")
		}
	}

	render = () => (
		<BlockUi tag="div" blocking={this.props.isLoading}>
			<div className="container mt-5">
				<Toastr/>
				<div className="row justify-content-center">
					<div className="col-auto mb-3">
						<h1>Authentication</h1>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-auto mb-3">
						<p className="text-muted h3">Rocambole App</p>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-sm-4 mb-3">
						<input ref="username" className="form-control text-center" type="text" placeholder="username"/>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-sm-4 mb-3">
						<input ref="password" className="form-control text-center" type="password" placeholder="password"/>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-sm-4 text-center mb-3">
						<h5>Or token</h5>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-sm-4 mb-3">
						<input ref="token" className="form-control text-center" type="text" placeholder="token"/>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-auto mb-3">
						<button onClick={this.loginHandler} className="btn btn-primary">Sign in</button>
					</div>
				</div>
			</div>
		</BlockUi>
	)
}

export default connect( state => ({
	isLoading: state.login.isLoading
}))(Login)
