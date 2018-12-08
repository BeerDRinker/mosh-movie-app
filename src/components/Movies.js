import React, { Component, Fragment } from 'react'
import { getMovies } from '../services/fakeMovieService'
import Like from './common/Like'

const DeleteButton = ({ deleteMovie, id }) => (
	<button onClick={() => deleteMovie(id)} className="btn btn-danger">Delete</button>
)

const RenderMovieRow = ({ movie, deleteMovie, likeMovie }) => {
	const { _id, title, genre, numberInStock, dailyRentalRate, liked } = movie
	return ( <tr>
			<td>{title}</td>
			<td>{genre.name}</td>
			<td>{dailyRentalRate}</td>
			<td>{numberInStock}</td>
			<td><Like liked={liked} likeMovie={likeMovie} id={_id} /></td>
			<td><DeleteButton deleteMovie={deleteMovie} id={_id} /></td>
	</tr> )
}

const renderMovies = (movies, deleteMovie, likeMovie) => movies.map(movie => <RenderMovieRow key={movie._id} movie={movie} deleteMovie={deleteMovie} likeMovie={likeMovie} />)

export default class Movies extends Component {
	
	state = { 
		movies: []
	}

	componentDidMount() {
		this.setState({
			movies: getMovies()
		})
	}

	deleteMovie = (id) => {
		this.setState({
			movies: this.state.movies.filter(movie => movie._id !== id)
		})
	}

	likeMovie = (id, status) => {
		const movies = [...this.state.movies]
		console.log('likeMovie: ', movies);
		movies.map(movie => {
			if(movie._id === id) {
				movie.liked = status
			}
			return movie
		})
		this.setState({
			movies
		})
	}
	
	render() {
		const { movies } = this.state

		if (movies.length === 0) {
			return (<h5 className="pt-3 pb-3">There are no movies in the database</h5>)
		}

		return (
			<Fragment>
				<h5 className="pt-3 pb-3">Showing { movies.length } movies in the database</h5>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Genre</th>
							<th scope="col">Stock</th>
							<th scope="col">Rate</th>
							<th scope="col"></th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{renderMovies(movies, this.deleteMovie, this.likeMovie)}
					</tbody>
				</table>
			</Fragment>
		)
	}
}
