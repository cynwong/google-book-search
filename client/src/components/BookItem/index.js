import React from 'react';

import { Row, Col, Container } from '../Grid';

import API from '../../utils/API';

export default function BookItem(props) {
	const { book: {
		title,
		authors,
		description,
		id,
		link,
		image
	} } = props;

	const authorNames = authors ? authors.join(', ') : '';

	const handleViewBook = (e) => {
		e.preventDefault();
		window.location.assign(link);
	}

	const handleSaveBook = (e) => {
		e.preventDefault();
		API.saveBook({
			title,
			authors,
			description,
			googleId: id,
			link,
			image
		});
	}
	const defaultPlaceHolder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMrgcAATsA3BT31OAAAAAASUVORK5CYII=";
	return (
		<Row>
			<Container className='m-3 border border-dark p-3'>
				<Row>
					<Col size='8'>
						<h4>{title}</h4>
						<p>Written By {authorNames}</p>
					</Col>
					<Col>
						<button className="btn btn-success"  style={{ marginRight:'5px' }} onClick={handleViewBook}>
							View
						</button>
						<button className="btn btn-success" onClick={handleSaveBook}>
							Save
						</button>
					</Col>
				</Row>
				<Row>
					<Col size='3'>
						<img src={image ? image : defaultPlaceHolder} alt={title} />
					</Col>
					<Col>
						{description}
					</Col>
				</Row>
			</Container>
		</Row>
	)
}
