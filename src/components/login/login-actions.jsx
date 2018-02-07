import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import { API_BASE_URL, API_BASE_PURCHASES } from '../../utils/consts'

import { resetCart } from '../cart/cart-action'

export const LOGIN__DO_LOGIN = 'LOGIN__DO_LOGIN'

export const LOGIN__LOGOUT = 'LOGIN__LOGOUT'

export const LOGIN__SET_IS_LOGGED = 'LOGIN__SET_IS_LOGGED'

export const LOGIN__SET_IS_LOADING = 'LOGIN__SET_IS_LOADING'

export const login = (username, password) => ({ type: LOGIN__DO_LOGIN, username, password })

// simulates an token authentication
export const tokenAuthentication = (token) => (
	dispatch => {
		dispatch(setIsLoading(true))
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		axios.defaults.headers.common['Accept'] = 'application/json'
		axios.get(`${API_BASE_URL}${API_BASE_PURCHASES}`)
			.then( res => {
				dispatch(setIsLogged(true))
				dispatch(setIsLoading(false))
			})
			.catch( err => {
				dispatch(setIsLogged(false))
				dispatch(setIsLoading(false))
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

export const setIsLoading = (status) => ({ type: LOGIN__SET_IS_LOADING, status })
