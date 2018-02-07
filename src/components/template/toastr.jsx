import React from 'react'
import ReactToastr from 'react-redux-toastr'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class Toastr extends React.Component {

	render = () => {
		return (
			<ReactToastr
				timeOut={4000}
				newestOnTop={false}
				preventDuplicates={true}
				position='top-right'
				transitionIn="fadeIn"
				transitionOut="fadeOut"/>
		)
	}
}

export default Toastr
