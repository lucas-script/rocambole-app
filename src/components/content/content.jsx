import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Products from '../products/products'

class Content extends React.Component {

	render = () => {
		return (
			<BrowserRouter>
				<div>
					<Route exact path="/" component={Products}/>
					<Route exact path="/products" component={Products}/>
				</div>
			</BrowserRouter>
		)
	}
}

export default Content
