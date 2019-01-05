import React from 'react'
import { FormGroup, FormFeedback, Label, Input as BInput } from 'reactstrap';

const Select = ({ name, label, options, error, ...rest }) => {
	return (
		<FormGroup>
			<Label htmlFor={name}>{ label }</Label>
			<BInput type="select" name={name} id={name} {...rest} >
				<option value="" />
				{ options.map(option =>
					<option key={option._id} value={option._id}>
						{option.name}
					</option>)}
			</BInput>
			<FormFeedback>{error}</FormFeedback>
		</FormGroup>
	)
}

export default Select
