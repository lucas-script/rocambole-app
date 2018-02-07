import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { API_BASE_URL, API_BASE_SIMULATION, API_BASE_PRODUCTS } from '../../utils/consts'

import { currency } from '../../utils/format'

import { setLoading } from '../cart-details/cart-details-actions'
import { removeItem, fetchCartSimulation } from '../cart/cart-action'

class CartDetailsProduct extends React.Component {

	state = {
		name: '',
		price: '',
		sku: '',
		product: '',
		quantity: 0,
		subtotal: 0,
		discount: 0,
		total: 0,
	}

	constructor(props) {
		super(props)
		this.state  = { ...this.state, product: this.props.product, quantity: this.props.quantity }
	}

	componentDidMount = () => {
		this.fetchProduct()
		this.fetchItemSimulation()
	}

	// fetch product info
	fetchProduct = () => {
		this.props.dispatch(setLoading(true))
		const url = `${API_BASE_URL}${API_BASE_PRODUCTS}/${this.state.product}`
		axios.get(url)
			.then( res => {
				const {sku, name, price} = res.data
				this.setState( state => ({ ...state, sku: sku, name: name, price: price }))
				this.props.dispatch(setLoading(false))
			})
			.catch( err => console.error(err) )
	}

	// fetch the simulation per item
	fetchItemSimulation = () => {
		this.props.dispatch(setLoading(true))
		const url = `${API_BASE_URL}${API_BASE_SIMULATION}`
		const obj = { items: [{ product: this.state.product, quantity: this.state.quantity }] }
		axios.post(url, obj)
			.then( res => {
				const { subtotal, discount, total } = res.data
				this.setState( state => ({ ...state, subtotal, discount, total }))
				this.props.dispatch(setLoading(false))
			})
			.catch( err => console.error(err) )
	}

	onRemove = (product) => {
		this.props.dispatch(removeItem(product))
		this.props.dispatch(fetchCartSimulation())
	}

	render = () => {
		return (
			<tr>
				<td>{this.state.name}</td>
				<td>{this.state.quantity}</td>
				<td>{currency(this.state.subtotal)}</td>
				<td>{currency(this.state.discount)}</td>
				<td>{currency(this.state.total)}</td>
				<td><button onClick={() => this.onRemove(this.state.product)} className="btn btn-outline-danger"><span className="fa fa-trash">&nbsp;Remove</span></button></td>
			</tr>
		)
	}
}

export default connect( state => ({}))(CartDetailsProduct)
