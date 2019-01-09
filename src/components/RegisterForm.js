import React from 'react'
import { Form } from 'reactstrap'
import Joi from 'joi-browser'
import { toast } from 'react-toastify';

import { register } from '../services/userService'

import AppForm from './common/AppForm';

export default class RegisterForm extends AppForm {
constructor() {
		super()
		this.state = {
			data: {
				email: '',
				password: '',
				username: '',
			},
			errors: {}
		}
	}

	schema = {
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().min(5).required().label('Password'),
		username: Joi.string().required().label('Name')
	}

	doSubmit = async () => {
		try {
			const response = await register(this.state.data)
			localStorage.setItem('token', response.headers['x-auth-token'])
			this.props.history.push('/')
		} catch(error) {
			if(error.response && error.response.status === 400) {
				toast.error(error.response.data)
				const errors = {...this.state.errors}
				errors.email = error.response.data
				this.setState({ errors })
			}
		}
	}

	render() {
		return (
			<div>
				<h1 className="mt-3">Register</h1>
				<Form onSubmit={(e) => this.handleSubmit(e)}>

					{this.renderInput('email', 'Username', 'email', true)}

					{this.renderInput('password', 'Password', 'password')}

					{this.renderInput('username', 'Name' )}

					{this.renderButton('Register')}
					
				</Form>
			</div>
		)
	}
}
