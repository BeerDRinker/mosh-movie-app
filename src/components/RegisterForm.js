import React from 'react'
import { Form } from 'reactstrap'
import Joi from 'joi-browser'

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

	doSubmit = () => {
		console.log('Submitted');
	}
	render() {
		return (
			<div>
				<h1 className="mt-3">Register</h1>
				<Form onSubmit={(e) => this.handleSubmit(e)}>

					{this.renderInput('email', 'Username', 'email')}

					{this.renderInput('password', 'Password', 'password')}

					{this.renderInput('username', 'Name' )}

					{this.renderButton('Register')}
					
				</Form>
			</div>
		)
	}
}
