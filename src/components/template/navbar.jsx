import React from 'react'
import { connect } from 'react-redux'

import { clearCartAndLogout } from '../login/login-actions'

class Navbar extends React.Component {

	onLogout = () => (this.props.dispatch(clearCartAndLogout()))

	render = () => {
		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-primary">
				<div className="container-fluid">
					<a className="navbar-brand text-white">Rocambole App</a>
					<button className="navbar-toggler" data-toggler="collapse" data-target="#navbar">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbar">
						<ul className="navbar-nav">
							<li className="nav-item">
								<button className="btn btn-link nav-link" href="/products">Products</button>
							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<button onClick={this.onLogout} className="btn btn-link nav-link">Logout</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default connect( state => ({}))(Navbar);
