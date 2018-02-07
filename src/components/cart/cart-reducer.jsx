import {
	CART__ADD_ITEM_TO_CART, CART__SET_SUBTOTAL,
	CART__SET_DISCOUNT, CART__SET_TOTAL,
	CART__SET_LOADING, CART__RESET_CART,
	CART__REMOVE_ITEM } from './cart-action'

const INITIAL_STATE = {
	items: [],
	subtotal: 0,
	discount: 0,
	total: 0,
	isLoading: false,
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CART__ADD_ITEM_TO_CART:
			let updatedList = [ ...state.items ]
			const itemFound = state.items.some( item => item.product === action.item.product )
			if (itemFound) {
				// increase the quantity
				updatedList = updatedList.map( item => {
					if (item.product === action.item.product) {
						const oldQuantity = parseInt(item.quantity, 10)
						const newQuantity = parseInt(action.item.quantity, 10)
						const updatedQuantity = (oldQuantity + newQuantity).toString()

						return {
							product: item.product,
							quantity: updatedQuantity,
						}
					} else {
						return item
					}
				})
			} else {
				updatedList.push(action.item)
			}

			return { ...state, items: updatedList }
		case CART__REMOVE_ITEM:
			return { ...state, items: state.items.filter( item => (item.product !== action.product)) }
		case CART__SET_SUBTOTAL:
			return { ...state, subtotal: action.subtotal }
		case CART__SET_DISCOUNT:
			return { ...state, discount: action.discount }
		case CART__SET_TOTAL:
			return { ...state, total: action.total }
		case CART__SET_LOADING:
			return { ...state, isLoading: action.status }
		case CART__RESET_CART:
			return { ...state, items: [], subtotal: 0, discount: 0, total: 0 }
		default:
			return state
	}
}
