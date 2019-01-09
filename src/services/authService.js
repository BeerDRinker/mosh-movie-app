import http from './httpService'
import { apiUrl } from '../config.json'

const loginAPI = `${apiUrl}/auth`

export const login = (email, password) => http.post(loginAPI, {email, password})