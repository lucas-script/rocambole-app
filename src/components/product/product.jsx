import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { currency } from '../../utils/format'
import { API_BASE_URL, API_BASE_SIMULATION } from '../../utils/consts'

import { addItemToCart, fetchCartSimulation } from '../cart/cart-action'

import BlockUi from 'react-block-ui'

class Product extends React.Component {

	state = {
		id: null,
		name: null,
		quantity: null,
		subtotal: 0,
		discount: 0,
		total: 0,
		isLoading: false,
	}

	componentDidMount = () => {
		this.setComponentState('id', this.props.id)
		this.setComponentState('name', this.props.name)
	}

	setComponentState = (prop, value) => this.setState( state => ({ ...state, [prop]: value }))

	fetchSimulation = () => {

		this.setLoading(true)
		const id = this.state.id
		const quantity = this.refs.quantity.value

		let obj = {
			items: []
		}
		const item  = {
			"product": id,
			"quantity": quantity
		}
		obj.items.push(item)
		const url = `${API_BASE_URL}${API_BASE_SIMULATION}`

		axios.post(url, obj)
			.then( res => {
				const data = res.data
				const subtotal = data.subtotal
				const discount = data.discount
				const total = data.total
				this.setComponentState('subtotal', subtotal)
				this.setComponentState('discount', discount)
				this.setComponentState('total', total)
				this.setLoading(false)
			})
			.catch( err => console.error(err) )
	}

	addToCart = () => {
		const id = this.state.id
		const quantity = this.refs.quantity.value
		if (quantity === '' || quantity === '0') return

		const item = {
			product: id,
			quantity,
		}
		this.props.dispatch(addItemToCart(item))
		this.clearComponent()
		this.props.dispatch(fetchCartSimulation())
	}

	clearComponent = () => {
		this.setComponentState('quantity', 0)
		this.refs.quantity.value = null
		this.setComponentState('subtotal', 0)
		this.setComponentState('discount', 0)
		this.setComponentState('quantity', 0)
		this.setComponentState('total', 0)
	}

	setLoading = status => this.setComponentState('isLoading', status)

	render = () => {
		return (
		<BlockUi tag="div" blocking={this.state.isLoading}>
			<div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 mb-2">
				<div className="card" style={{width: '15rem'}}>
					<div className="card-body">
						<div className="row">
							<div className="col-sm-12">
								<h5 className="card-title">{this.props.name}&nbsp;<p className="text-muted">{this.props.sku}</p></h5>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<p className="card-text"><b>{currency(this.props.price)}</b>&nbsp;un.</p>
							</div>
						</div>
						<div className="row mt-2">
							<div className="col-sm-12">
								<span className="text-muted">Subtotal: {currency(this.state.subtotal)}</span>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<span className="text-muted">Discount: {currency(this.state.discount)}</span>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<span className="text-muted"><h5><b>Total: {currency(this.state.total)}</b></h5></span>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<input ref="quantity" onChange={this.fetchSimulation} className="form-control" type="number" min="0" step="1" placeholder="Quantity"/>
							</div>
						</div>
						<div className="row mt-2">
							<div className="col-sm-12">
								<button onClick={this.addToCart} className="btn btn-primary ml-auto"><span className="fa fa-cart-plus">&nbsp;Add</span></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</BlockUi>
		)
	}
}

export default connect( state => ({
	items: state.cart.items
}))(Product)
