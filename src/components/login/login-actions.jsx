import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import { API_BASE_URL, API_BASE_PURCHASES } from '../../utils/consts'

import { resetCart } from '../cart/cart-action'

export const LOGIN__DO_LOGIN = 'LOGIN__DO_LOGIN'

export const LOGIN__LOGOUT = 'LOGIN__LOGOUT'

export const LOGIN__SET_IS_LOGGED = 'LOGIN__SET_IS_LOGGED'

export const login = (username, password) => ({ type: LOGIN__DO_LOGIN, username, password })

// simulates an token authentication
export const tokenAuthentication = (token) => (
	dispatch => {
		console.log('token', token)
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		axios.defaults.headers.common['Accept'] = 'application/json'
		axios.get(`${API_BASE_URL}${API_BASE_PURCHASES}`)
			.then( res => {
				console.log('res', res)
				dispatch(setIsLogged(true))
			})
			.catch( err => {
				console.error(err)
				dispatch(setIsLogged(false))
				toastr.error('Invalid Token', 'Please provide a valid token')
			})
	}
)

export const logout = () => ({ type: LOGIN__LOGOUT })

export const clearCartAndLogout = () => (
	dispatch => {
		dispatch(resetCart())
		dispatch(logout())
	}
)

export const setIsLogged = (status) => ({ type: LOGIN__SET_IS_LOGGED, status })
