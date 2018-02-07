export const CART_DETAILS__SET_IS_OPEN = 'CART_DETAILS__SET_IS_OPEN'
export const CART_DETAILS__OPEN = 'CART_DETAILS__OPEN'
export const CART_DETAILS__CLOSE = 'CART_DETAILS__CLOSE'

// shorthand way to open modal
export const open = () => (
	dispatch => {
		dispatch(setIsCartDetailsOpen(true))
	}
)

// shorthand way to close modal
export const close = () => (
	dispatch => {
		dispatch(setIsCartDetailsOpen(false))
	}
)

export const setIsCartDetailsOpen = status => ({ type: CART_DETAILS__SET_IS_OPEN, status })
