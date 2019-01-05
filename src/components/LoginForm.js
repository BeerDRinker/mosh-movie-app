import React from 'react'
import { Form } from 'reactstrap'
import Joi from 'joi-browser'

import AppForm from './common/AppForm'

export default class LoginForm extends AppForm {
	constructor() {
		super()
		this.state = {
			data: {
				username: '',
				password: '',
			},
			errors: {}
		}
	}

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password')
	}

	doSubmit = () => {
		console.log('Submitted');
	}

  render() {
    return (
			<div>
				<h1 className="mt-3">Login</h1>
				<Form onSubmit={(e) => this.handleSubmit(e)}>

					{this.renderInput('username', 'Username', 'text', true)}

					{this.renderInput('password', 'Password', 'password')}

					{this.renderButton('Login')}
					
				</Form>
			</div>
    );
  }
}