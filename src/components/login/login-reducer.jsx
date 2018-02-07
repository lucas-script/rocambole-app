import { LOGIN__DO_LOGIN, LOGIN__LOGOUT, LOGIN__SET_IS_LOGGED } from './login-actions'

const INITIAL_STATE = {
	isLogged: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN__DO_LOGIN:
			return state
		case LOGIN__LOGOUT:
			return { ...state, isLogged: false }
		case LOGIN__SET_IS_LOGGED:
			return { ...state, isLogged: action.status }
		default:
			return state
	}
}