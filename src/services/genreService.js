import http from './httpService'
import { apiUrl } from '../config.json'

const genresAPI = `${apiUrl}/genres`

export const getGenresAPI = () => {
	return http.get(genresAPI)
}
