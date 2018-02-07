import { CART_DETAILS__SET_IS_OPEN } from './content-actions'

const INITIAL_STATE = {
	isOpen: false,
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CART_DETAILS__SET_IS_OPEN:
			return { ...state, isOpen: action.status }
		default:
			return state
	}
}