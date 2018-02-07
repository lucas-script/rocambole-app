import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import { API_BASE_URL,  API_BASE_PURCHASES, API_BASE_SIMULATION } from '../../utils/consts'

import { setLoading as cartDetailsSetLoading } from '../cart-details/cart-details-actions'
import { close as closeCartDetails } from '../content/content-actions'

export const CART__ADD_ITEM_TO_CART = 'CART__ADD_ITEM_TO_CART'
export const CART__SET_SUBTOTAL = 'CART__SET_SUBTOTAL'
export const CART__SET_DISCOUNT = 'CART__SET_DISCOUNT'
export const CART__SET_TOTAL = 'CART__SET_TOTAL'
export const CART__SET_LOADING = 'CART__SET_LOADING'
export const CART__RESET_CART = 'CART__RESET_CART'
export const CART__REMOVE_ITEM = 'CART__REMOVE_ITEM'

export const addItemToCart = (item) => ({ type: CART__ADD_ITEM_TO_CART, item })

export const setSubtotal = (subtotal) => ({ type: CART__SET_SUBTOTAL, subtotal })

export const setDiscount = (discount) => ({ type: CART__SET_DISCOUNT, discount })

export const setTotal = (total) => ({ type: CART__SET_TOTAL, total })

export const setCartResume = (obj) => (
	dispatch => {
		const { subtotal, discount, total } = obj
		dispatch(setSubtotal(subtotal))
		dispatch(setDiscount(discount))
		dispatch(setTotal(total))
	}
)

export const setLoading = status => ({ type: CART__SET_LOADING, status })

export const fetchCartSimulation = () => (
	(dispatch, getState) => {
		dispatch(setLoading(true))
		const items = getState().cart.items
		const obj = { items }
		const url = `${API_BASE_URL}${API_BASE_SIMULATION}`
		axios.post(url, obj)
			.then( res => {
				const { subtotal, discount, total } = res.data
				dispatch(setCartResume({ subtotal, discount, total }))
				dispatch(setLoading(false))
			})
			.catch( err => console.log(err) )
	}
)

export const checkout = () => (
	(dispatch, getState) => {
		dispatch(cartDetailsSetLoading(true))
		const items = getState().cart.items
		const obj = { items }
		const url = `${API_BASE_URL}${API_BASE_PURCHASES}`
		axios.post(url, obj)
			.then( res => {
				console.log(res.data)
				toastr.success('Checkout', 'Purchases completed successfully')
				dispatch(resetCart())
				dispatch(cartDetailsSetLoading(false))
				dispatch(closeCartDetails())
			})
			.catch( err => console.error(err) )
	}
)

export const resetCart = () => ({ type: CART__RESET_CART })


export const removeItem = (product) => ({ type: CART__REMOVE_ITEM, product })
