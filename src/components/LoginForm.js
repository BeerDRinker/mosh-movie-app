import React from 'react'
import { Form } from 'reactstrap'
import Joi from 'joi-browser'
import { toast } from 'react-toastify';

import { login } from '../services/authService'
import AppForm from './common/AppForm'

export default class LoginForm extends AppForm {
	constructor() {
		super()
		this.state = {
			data: {
				email: '',
				password: '',
			},
			errors: {}
		}
	}

	schema = {
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().min(5).required().label('Password'),
	}

	doSubmit = async () => {
		const { email, password } = this.state.data
		try {
			const { data } = await login(email, password)
			localStorage.setItem('token', data)
			this.props.history.push('/')
		} catch (error) {
			if(error.response && error.response.status === 400)	{
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
				<h1 className="mt-3">Login</h1>
				<Form onSubmit={(e) => this.handleSubmit(e)}>

					{this.renderInput('email', 'Email', 'text', true)}

					{this.renderInput('password', 'Password', 'password')}

					{this.renderButton('Login')}
					
				</Form>
			</div>
    );
  }
}