import React from 'react'
import { connect } from 'react-redux'

import { currency } from '../../utils/format'

import { open } from '../content/content-actions'

import BlockUi from 'react-block-ui'

class Cart extends React.Component {

	openDetails = () => this.props.dispatch(open())

	render = () => {
		return (
			<BlockUi tag="div" blocking={this.props.isLoading}>
				<div className="container-fluid mt-4">
					<div className="form-row justify-content-center">
						<div className="col-auto">
							<i className="fa fa-shopping-cart fa-2x"></i>
						</div>
						<div className="col-auto">
							<span className="text-muted">Subtotal<span className="font-weight-bold text-info">&nbsp;{currency(this.props.subtotal)}</span></span>
						</div>
						<div className="col-auto">
							<span className="text-muted">Discount<span className="font-weight-bold text-danger">&nbsp;{currency(this.props.discount)}</span></span>
						</div>
						<div className="col-auto">
							<h4 className="text-muted">Total<span className="font-weight-bold text-success">&nbsp;{currency(this.props.total)}</span></h4>
						</div>
						<div className="col-auto">
							<button onClick={this.openDetails} className="btn btn-outline-danger">Cart Details</button>
						</div>
					</div>
				</div>
			</BlockUi>
		)
	}
}

export default connect( state => ({
	subtotal: state.cart.subtotal,
	discount: state.cart.discount,
	total: state.cart.total,
	isLoading: state.cart.isLoading,
}))(Cart)
