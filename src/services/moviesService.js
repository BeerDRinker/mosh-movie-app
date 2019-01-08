import http from './httpService'
import { apiUrl } from '../config.json'

const moviesAPI = `${apiUrl}/movies`

const movieURL = (movieId) => `${moviesAPI}/${movieId}`

export const getMoviesAPI = () => http.get(moviesAPI)
export const deleteMovieAPI = (movieId) => http.delete(movieURL(movieId))
export const getMovieAPI = (movieId) => http.get(movieURL(movieId))
export const saveMovieAPI = (movie) => {
	const { _id: movieId, ...body } = movie
	if(movieId) {
		return http.put(movieURL(movieId), body)
	}
	return http.post(moviesAPI, movie)
}