import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui'

import { css } from '../template/modal'

import { currency } from '../../utils/format'

import { close } from '../content/content-actions'

import { checkout as cartCheckout } from '../cart/cart-action'

import CartDetailsProduct from './cart-details-product'

class CartDetails extends React.Component {

	closeModal = () => this.props.dispatch(close())

	checkout = () => this.props.dispatch(cartCheckout())

	isCheckoutDisabled = () => {
		if (this.props.items.length <= 0) {
			return 'disabled'
		} else {
			return ''
		}
	}

	isEmpty = () => {
		if (this.props.items.length <= 0) {
			return <span className="text-muted">Empty</span>
		} else {
			return false
		}
	}
	renderItems = () => {
		return this.props.items.map( item => (
				<CartDetailsProduct key={item.product} product={item.product} quantity={item.quantity}/>
		))

	}

	render = () => {
		return (
			<Modal contentLabel="Cart details" style={css} isOpen={this.props.isOpen} ariaHideApp={false}>
				<BlockUi tag="div" blocking={this.props.isLoading}>
					<div className="container-fluid">
						<div className="form-row mb-4">
							<div className="col-auto">
								<i className="fa fa-shopping-cart fa-2x"></i>
							</div>
							<div className="col-auto">
								<h4>Cart details {this.isEmpty()}</h4>
							</div>
						</div>
						<div className="row">
							<table className="table table-hover">
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Quantity</th>
										<th scope="col">Subtotal</th>
										<th scope="col">Discount</th>
										<th scope="col">Total</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{ this.renderItems() }
								</tbody>
								<tfoot>
									<tr>
										<td></td>
										<td></td>
										<td className="text-info">{currency(this.props.subtotal)}</td>
										<td className="text-danger">{currency(this.props.discount)}</td>
										<td className="text-success"><b>{currency(this.props.total)}</b></td>
										<td></td>
									</tr>
								</tfoot>
							</table>
						</div>
						<hr/>
						<div className="row">
							<div className="col-auto">
								<button onClick={this.checkout} disabled={this.isCheckoutDisabled()} className={`btn btn-success`}><span className="fa fa-check"></span>&nbsp;Checkout</button>
							</div>
							<div className="col-auto ml-auto">
								<button onClick={this.closeModal} className="btn btn-danger"><span className="fa fa-times"></span>&nbsp;Close</button>
							</div>
						</div>
					</div>
				</BlockUi>
			</Modal>
		)
	}
}

export default connect( state => ({
	isOpen: state.content.isOpen,
	items: state.cart.items,
	subtotal: state.cart.subtotal,
	discount: state.cart.discount,
	total: state.cart.total,
	isLoading: state.cartDetails.isLoading,
}))(CartDetails)
