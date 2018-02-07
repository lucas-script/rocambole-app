import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { API_BASE_URL, API_BASE_PRODUCTS, MAX_RESULTS } from '../../utils/consts'

import { addMaxResults, addPage, addWhere } from '../../utils/url'

import Product from '../product/product'
import BlockUi from 'react-block-ui'

class Products extends React.Component {

	state = {
		items: [],
		total: 0,
		currentPage: 1,
		isFiltering: false,
		isLoading: false,
	}

	componentDidMount = () => {
		this.fetchProductsByPage()
	}

	setComponentState = (prop, value) => this.setState( state => ({ ...state, [prop]: value }))

	fetchProductsByPage = (page = 1) => {
		this.setLoading(true)
		const url = `${API_BASE_URL}${API_BASE_PRODUCTS}?${addMaxResults(MAX_RESULTS)}&${addPage(page)}`
		this.setComponentState('currentPage', page)

		axios.get(url)
			.then( res => {
				const page = res.data
				const items = page._items
				const total = page._meta.total
				this.setComponentState('items', items)
				this.setComponentState('total', total)
				this.setLoading(false)
			})
			.catch( err => console.error(err) )
	}

	fetchProductsByFilter = (page = 1) => {
		this.setLoading(true)
		this.setIsFiltering(true)
		this.setComponentState('currentPage', 1)

		const filter = this.refs.filter.value
		const searchText = this.refs.searchText.value
		const url = `${API_BASE_URL}${API_BASE_PRODUCTS}?${addWhere(filter, searchText)}&${addMaxResults(MAX_RESULTS)}&${addPage()}`
		this.setComponentState('currentPage', page)

		axios.get(url)
			.then( res => {
				const page = res.data
				const items = page._items
				const total = page._meta.total
				this.setComponentState('items', items)
				this.setComponentState('total', total)
				this.setLoading(false)
			})
			.catch( err => console.error(err) )
	}

	clearFilter = () => {
		this.setIsFiltering(false)
		this.fetchProductsByPage()
		this.refs.searchText.value = ''
	}

	setIsFiltering = (status) => this.setComponentState('isFiltering', status)

	renderProducts = () => {
		if (this.state.items.length <= 0) {
			return (
				<div>
					<h5>No product found</h5>
				</div>
			)
		} else {
			return this.state.items.map( product => (
				<Product key={product._id} id={product._id} name={product.name} price={product.price} sku={product.sku}/>
			))
		}
	}


	renderPagination = () => {
		const numberOfPages = this.getMaxNumberOfPages()
		let listOfComponents = []
		for (let i = 1; i <= numberOfPages; i++) {

			const paginationFunction = this.state.isFiltering
				? this.fetchProductsByFilter
				: this.fetchProductsByPage

			listOfComponents.push(
				<li key={i} className={`page-item ${this.isPageActive(i)}`}>
					<button onClick={() => paginationFunction(i)} className="btn page-link rounded-0">{i}</button>
				</li>
			)
		}

		return listOfComponents
	}

	goNext = () => {
		const nextPage = this.state.currentPage === this.getMaxNumberOfPages()
			? 1
			: this.state.currentPage + 1

		this.setComponentState('currentPage', nextPage)

		this.state.isFiltering
			? this.fetchProductsByFilter(nextPage)
			: this.fetchProductsByPage(nextPage)
	}

	goPrev = () => {
		const prevPage = this.state.currentPage === 1
			? this.getMaxNumberOfPages()
			: this.state.currentPage - 1

		this.setComponentState('currentPage', prevPage)

		this.state.isFiltering
			? this.fetchProductsByFilter(prevPage)
			: this.fetchProductsByPage(prevPage)
	}

	getMaxNumberOfPages = () => {
		return Math.ceil(this.state.total / MAX_RESULTS)
	}

	isPageActive = (pageIndex) => {
		if (pageIndex === this.state.currentPage) {
			return 'active'
		} else {
			return ''
		}
	}

	setLoading = status => this.setComponentState('isLoading', status)

	handleShortcuts = (e) => {
		if (e.key === 'Enter') {
			this.fetchProductsByFilter()
		}
		if ( (e.ctrlKey && e.key === 'c') || (e.ctrlKey && e.key === 'C') ) {
			this.clearFilter()
		}
	}

	render = () => {
		return (
			<BlockUi tag="div" blocking={this.state.isLoading}>
				<div className="container-fluid" onKeyDown={this.handleShortcuts}>
					<div className="form-row justify-content-center mt-4 mb-4">
						<div className="col-auto">
							<select ref="filter" defaultValue="sku" className="custom-select mr-sm-2">
								<option disabled>Seach by</option>
								<option value="name">Name</option>
								<option value="sku">SKU</option>
							</select>
						</div>
						<div className="col-auto">
							<input ref="searchText" className="form-control" type="text" placeholder="SKU or Name"/>
						</div>
						<div className="col-auto">
							<button onClick={this.fetchProductsByFilter} className="btn btn-outline-primary">Search (Enter)</button>
						</div>
						<div className="col-auto">
							<button onClick={this.clearFilter} className="btn btn-outline-secondary">Clear filter (Ctrl + c)</button>
						</div>
					</div>
					<hr/>
					<div className="row justify-content-center mt-4">
						<nav aria-label="Page navigation example">
							<ul className="pagination">
								<li className="page-item">
									<button onClick={this.goPrev} className="btn page-link rounded-0" aria-label="Previous">
										<span aria-hidden="true">&laquo;</span>
										<span className="sr-only">Previous</span>
									</button>
								</li>
								{ this.renderPagination() }
								<li className="page-item">
									<button onClick={this.goNext} className="btn page-link rounded-0" aria-label="Next">
										<span aria-hidden="true">&raquo;</span>
										<span className="sr-only">Next</span>
									</button>
								</li>
							</ul>
						</nav>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<div className="card-deck ml-4 mr-4">
								{ this.renderProducts() }
							</div>
						</div>
					</div>
				</div>
			</BlockUi>
		)
	}
}

export default connect( state => ({
	pages: state.products.pages,
	total: state.products.total,
}))(Products)
