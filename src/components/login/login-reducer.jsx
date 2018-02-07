import { LOGIN__DO_LOGIN, LOGIN__LOGOUT, LOGIN__SET_IS_LOGGED, LOGIN__SET_IS_LOADING } from './login-actions'

const INITIAL_STATE = {
	isLogged: false,
	isLoading: false,
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN__DO_LOGIN:
			return state
		case LOGIN__LOGOUT:
			return { ...state, isLogged: false }
		case LOGIN__SET_IS_LOGGED:
			return { ...state, isLogged: action.status }
		case LOGIN__SET_IS_LOADING:
			return { ...state, isLoading: action.status }
		default:
			return state
	}
}