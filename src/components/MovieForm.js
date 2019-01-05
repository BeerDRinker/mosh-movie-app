import React from "react"
import { Form } from 'reactstrap'
import Joi from 'joi-browser'

import AppForm from './common/AppForm'
import { getGenres } from '../services/fakeGenreService'
import { getMovie, saveMovie } from '../services/fakeMovieService'

export default class MovieForm extends AppForm {
  constructor() {
		super()
		this.state = {
			data: {
				title: '',
				genreId: '',
				numberInStock: '',
        dailyRentalRate: '',
			},
      errors: {},
      genres: []
		}
  }

  componentDidMount() {
		const genres = getGenres()
    this.setState({ genres })
    
    const movieId = this.props.match.params.id
    if (movieId === 'new') return

    const movie = getMovie(movieId)
    if (!movie) return this.props.history.replace('/not-found')

    this.setState({ data: this.mapToViewModal(movie) })
  }
  
  mapToViewModal(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

	schema = {
    _id: Joi.string(),
		title: Joi.string().min(5).required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
    dailyRentalRate: Joi.number().min(0).max(5).required().label('Rate'),
  }
  
	doSubmit = () => {
    saveMovie(this.state.data)
    this.props.history.push('/movies')
  }

  render() {
    return (
    <div>
      <h1>Movie Form</h1>
      <Form onSubmit={(e) => this.handleSubmit(e)}>
  
        {this.renderInput('title', 'Title', 'text', true)}
  
        {this.renderSelect('genreId', 'Genre', this.state.genres)}
  
        {this.renderInput('numberInStock', 'Number in Stock', 'number' )}

        {this.renderInput('dailyRentalRate', 'Rate' )}
  
        {this.renderButton('Save')}
  
      </Form>
    </div>
    )
  }
}