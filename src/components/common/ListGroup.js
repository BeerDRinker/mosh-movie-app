import React from 'react'

const ListGroup = ({ items, onItemSelect, textProperty, valueProperty, selectedItem }) => {

	const styles = (item, selectedItem) => {
		if (item === selectedItem) {
			return "list-group-item active"
		} else {
			return "list-group-item"
		}
	}

	return (<ul className="list-group">
		{ items.map(item => (
			<li 
				onClick={() => onItemSelect(item) }
				key={item[valueProperty]}
				className={styles(item, selectedItem)} >{item[textProperty]}
			</li>
		)) }
		</ul>
	)
}

ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id'
}

export default ListGroup