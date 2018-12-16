import React, { Component } from 'react'
import _ from 'lodash'

import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import { paginate } from '../utils/paginate'

import Pagination from './common/Pagination'
import ListGroup from './common/ListGroup'
import MoviesTable from './MoviesTable';

export default class Movies extends Component {
	
	state = { 
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
		sortColumn: { path: 'title', order: 'asc' }
	}

	componentDidMount() {
		const genres = [{ _id: '', name: 'All Genres' }, ...getGenres() ]
		this.setState({
			movies: getMovies(),
			genres
		})
	}

	deleteMovie = (id) => {
		this.setState({
			movies: this.state.movies.filter(movie => movie._id !== id)
		})
	}

	likeMovie = (id, status) => {
		const movies = [...this.state.movies]
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

	handlePageChange = page => {
		this.setState({ currentPage: page })
	}

	handleGenereSelect = genre => {
		this.setState({
			selectedGenre: genre,
			currentPage: 1
		})
	}

	handleSort = sortColumn => {
		this.setState({ sortColumn })
	}

	getPagedData = (selectedGenre, allMovies, sortColumn, currentPage, pageSize) => {
		const filtered = selectedGenre && selectedGenre._id
			? allMovies.filter(m => m.genre._id === selectedGenre._id)
			: allMovies

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

		const movies = paginate(sorted, currentPage, pageSize)

		return { totalCount: filtered.length, data: movies }
	}
	
	render() {
		const { movies: allMovies, pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state

		if (allMovies.length === 0) {
			return (<h5 className="pt-3 pb-3">There are no movies in the database</h5>)
		}

		const { totalCount, data: movies } = this.getPagedData(selectedGenre, allMovies, sortColumn, currentPage, pageSize)

		return (
			<div className="row mt-3">
				<div className="col-sm">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenereSelect}
						/>
				</div>
				<div className="col-sm">
					<h5 className="pt-3 pb-3">Showing { totalCount } movies in the database</h5>

					<MoviesTable
						movies={movies}
						deleteMovie={this.deleteMovie}
						likeMovie={this.likeMovie}
						onSort={this.handleSort}
						sortColumn={sortColumn}
					/>

					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>

				</div>
			</div>
		)
	}
}
