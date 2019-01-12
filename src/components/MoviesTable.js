import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import auth from '../services/authService'

import Like from './common/Like'
import Table from './common/Table' 
export default class MoviesTable extends Component {

	columns = [
		{ path: 'title',
			label: 'Title',
			content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
		},
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{ 
			key: "like", 
			content: (movie) => <Like liked={movie.liked} id={movie._id} likeMovie={this.props.likeMovie} />
		},
	]

	deleteBtn = {
		key: "delete",
		content: (movie) => { 
			const isAdmin =  auth.getCurrentUser()
			if(isAdmin) return <button onClick={() => this.props.deleteMovie(movie._id)} className="btn btn-danger">Delete</button>
			return null
		}
	}

	constructor() {
		super()
		const user = auth.getCurrentUser()
		if(user && user.isAdmin) 
		this.columns.push(this.deleteBtn)
	}

	render() {
		const { movies, sortColumn, onSort } = this.props

		return (
			<Fragment>
				<Table
					columns={this.columns}
					data={movies}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
			</Fragment>
		)
	}
}