import React, {useContext} from 'react';

import { Row, Col, Container } from '../Grid';

import BookContext from '../../utils/BookContext';

export default function BookItem(props) {
	const { saveBook, deleteBook } = useContext(BookContext);
	const { book: {
		title,
		authors,
		description,
		id,
		googleId,
		link,
		image,
		isSaved
	} } = props;

	const authorNames = authors ? authors.join(', ') : '';

	const handleViewBook = (e) => {
		e.preventDefault();
		window.location.assign(link);
	}

	const handleSaveBook = (e) => {
		e.preventDefault();
		saveBook({
			title,
			authors,
			description,
			googleId: id,
			link,
			image
		});
	}
	const handleDeleteBook = (e) => {
		e.preventDefault();
		let idToBeDeleted = id ? id : googleId;
		deleteBook(idToBeDeleted);
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
					<Col className="p-0" >
						<button className="btn btn-info" style={{marginRight:'3px'}} onClick={handleViewBook}>
							View
						</button>
						{isSaved ? (
							<button className="btn btn-danger" onClick={handleDeleteBook}>
								Delete
							</button>
						) : (
							<button className="btn btn-info" onClick={handleSaveBook}>
								Save
							</button>
							
						)
						}
						
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
