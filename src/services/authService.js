import http from './httpService'
import { apiUrl } from '../config.json'
import jwtDecode from 'jwt-decode'

const loginAPI = `${apiUrl}/auth`
const tokenKey = 'token'


export const login = async (email, password) => {
	const { data: jwt } = await http.post(loginAPI, {email, password})
	localStorage.setItem(tokenKey, jwt)
}

export const loginWithJwt = (jwt) => {
	localStorage.setItem(tokenKey, jwt)	
}

export const logout = () => localStorage.removeItem(tokenKey)

export const getCurrentUser = () => {
	try {
		const jwt = localStorage.getItem(tokenKey)
		return jwtDecode(jwt)
	} catch (error) {
		return null
	}
}

export const getJwt = () => localStorage.getItem(tokenKey)

http.setJwt(getJwt())

export default {
	login,
	logout,
	getCurrentUser,
	loginWithJwt,
	getJwt
}