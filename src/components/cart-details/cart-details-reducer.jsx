import { CART_DETAILS__SET_IS_LOADING } from './cart-details-actions'

const INITIAL_STATE = {
	isLoading: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CART_DETAILS__SET_IS_LOADING:
			return { ...state, isLoading: action.status }
		default:
			return state
	}
}