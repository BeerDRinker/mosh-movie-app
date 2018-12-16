import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
	const pageCount = Math.ceil(itemsCount / pageSize);

	if (pageCount === 1) return null

	const pages = _.range(1, pageCount + 1)

	return (
		<footer>
			<nav className="pt-3">
				<ul className="pagination">
					{ pages.map(page => (
						<li key={page} className={ page === currentPage ? "page-item active" : "page-item" }>
							<span className="page-link"
								onClick={() => onPageChange(page)}
							>
								{ page }
							</span>
						</li>)) }
 				</ul>
			</nav>
		</footer>
	)
}

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired
}

export default Pagination