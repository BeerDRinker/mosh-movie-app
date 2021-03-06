
import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Joi from 'joi-browser'

import Input from './Input'
import Select from './Select'

export default class AppForm extends Component {
	state = {
		data: {},
		errors: {},
	}

	validate = () => {
		const options = { abortEarly: false }
		const { error } = Joi.validate(this.state.data, this.schema, options)
		if (!error) {
			return null
		}
		const errors = {}
		for (let item of error.details) {
			errors[item.path[0]] = item.message
		}
		return errors;
	}

	handleSubmit = e => {
		e.preventDefault()

		const errors = this.validate();
		this.setState({ errors: errors || {} })
		if (errors) return

		this.doSubmit()
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(input)
		if (errorMessage) {
			errors[input.name] = errorMessage
		} else {
			delete errors[input.name]
		}

		const data = { ...this.state.data }
		data[input.name] = input.value
		this.setState({ data, errors })
	}

	validateProperty = ({ name, value}) => {
		const obj = { [name]: value}
		const schema = { [name]: this.schema[name] }
		const { error } = Joi.validate(obj, schema)
		return error ? error.details[0].message : null
	}

	renderButton = (label) => (
		<Button 
			disabled={ Boolean(this.validate()) }
			color="primary"
		>{label}</Button>
	)

	renderInput = (name, label, type = 'text', autoFocus = false ) => {
		const { data, errors } = this.state
		return (
		<Input
			type={type}
			name={name}
			value={data[name]}
			autoFocus={autoFocus}
			label={label}
			onChange={this.handleChange}
			error={errors[name]}
		/>
		)
	}

	renderSelect = (name, label, options) => {
		const { data, errors } = this.state
		return (
			<Select 
				name={name}
				value={data[name]}
				label={label}
				options={options}
				onChange={this.handleChange}
				error={errors[name]}
			/>
    );
	}
}
