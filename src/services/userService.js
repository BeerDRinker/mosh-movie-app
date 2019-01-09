import http from './httpService'
import { apiUrl } from '../config.json'

const usersAPI = `${apiUrl}/users`

export const register = (user) => 
	http.post(usersAPI, {
		email: user.email,
		password: user.password,
		name: user.username
	})