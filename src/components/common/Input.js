import React from 'react'
import { FormGroup, Label, Input as BInput, FormFeedback } from 'reactstrap';

const Input = ({ name, label, error, ...rest }) => {
	return (
		<FormGroup>
			<Label htmlFor={name}>{ label }</Label>
			<BInput
				{ ...rest }
				name={name}
				id={name}
				placeholder={label}
				invalid
			/>
			<FormFeedback>{error}</FormFeedback>
		</FormGroup>
	)
}

export default Input
