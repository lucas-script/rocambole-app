import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// template
import './index.css';
import AppOrLogin from './components/app-or-login/app-or-login'

import './components/template/bootstrap-flat.css'
import './components/template/style.css'
import 'font-awesome/css/font-awesome.css'
import 'react-block-ui/style.css'
import 'popper.js/dist/esm/popper'
import 'bootstrap/dist/js/bootstrap'

// reducers
import fakeReducer from './components/fake/fake-reducer'
import loginReducer from './components/login/login-reducer'
import productsReducer from './components/products/products-reducer'
import cartReducer from './components/cart/cart-reducer'
import contentReducer from './components/content/content-reducer'
import cartDetailsReducer from './components/cart-details/cart-details-reducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const reducer = combineReducers({
	fake: fakeReducer,
	login: loginReducer,
	products: productsReducer,
	cart: cartReducer,
	content: contentReducer,
	cartDetails: cartDetailsReducer,
	toastr: toastrReducer,
})

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer, devTools, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<AppOrLogin />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
