import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { tosat } from 'react-toastify'

import { getMoviesAPI, deleteMovieAPI } from '../services/moviesService'
import { getGenresAPI } from '../services/genreService'
import { paginate } from '../utils/paginate'

import Pagination from './common/Pagination'
import ListGroup from './common/ListGroup'
import SearchBox from './common/SearchBox'
import MoviesTable from './MoviesTable';

export default class Movies extends Component {
	
	state = { 
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
		selectedGenre: null,
		sortColumn: { path: 'titlgetGenresAPI', order: 'asc' },
		searchQuery: '',
	}

	getGenres = async () => {
		const { data } = await getGenresAPI()
		const genres = [{ _id: '', name: 'All Genres' }, ...data ]
		this.setState({ genres })
	}

	getMovies = async () => {
		const { data } = await getMoviesAPI()
		const movies = [...data ]
		this.setState({ movies })
	}

	componentDidMount() {
		this.getGenres()
		this.getMovies()
	}

	deleteMovie = (id) => {
		deleteMovieAPI(id)
	}

	handleDeleteMovie = async (id) => {
		const originslMovies = this.state.movies
		this.setState({
			movies: originslMovies.filter(movie => movie._id !== id)
		})
		
		try {
			await this.deleteMovie(id)
		} catch(error) {
			if (error.response && error.response.status === 404) {
				tosat.error('This movie has already been deleted.')
				this.setState({ movies: originslMovies })
			}
		}
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
			currentPage: 1,
			searchQuery: '',
		})
	}

	handleSort = sortColumn => {
		this.setState({ sortColumn })
	}

	getPagedData = (searchQuery, selectedGenre, allMovies, sortColumn, currentPage, pageSize) => {
		let filtered = allMovies

		if(searchQuery) {
			filtered = allMovies.filter(m => 
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
		} else if (selectedGenre && selectedGenre._id) {
			filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

		const movies = paginate(sorted, currentPage, pageSize)

		return { totalCount: filtered.length, data: movies }
	}

	handleSearch = (query) => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
	}
	
	render() {
		const { searchQuery, movies: allMovies, pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state
		const { totalCount, data: movies } = this.getPagedData(searchQuery, selectedGenre, allMovies, sortColumn, currentPage, pageSize)
		const { user } = this.props;

		return (
			<div className="row">
				<div className="col-sm">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenereSelect}
						/>
				</div>
				<div className="col-sm mt-3">
				{ user && 
					<Link
						to="/movies/new"
						className="btn btn-primary">
						New Movie
					</Link>
				}
				{ allMovies.length === 0
				? 
					(<h5 className="pt-3 pb-3">There are no movies in the database</h5>)
				:
					(<Fragment>
						<h5 className="pt-3 pb-3">Showing { totalCount } movies in the database</h5>
						
						<SearchBox value={searchQuery} onChange={this.handleSearch} />

						<MoviesTable
							movies={movies}
							deleteMovie={this.handleDeleteMovie}
							likeMovie={this.likeMovie}
							onSort={this.handleSort}
							sortColumn={sortColumn}
							user={user}
						/>

						<Pagination
							itemsCount={totalCount}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={this.handlePageChange}
						/>
					</Fragment>)
				}
				</div>
			</div>
		)
	}
}
