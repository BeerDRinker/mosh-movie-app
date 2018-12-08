import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/fontawesome-free-solid'
import { faHeart as faHeart_regular } from '@fortawesome/fontawesome-free-regular'

const Like = ({ liked, likeMovie, id }) => {
	return (
		<Fragment>
			{<FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => likeMovie(id, !liked)} icon={ liked ? faHeart : faHeart_regular } />}
		</Fragment>
	)
}

export default Like