import React, { useContext } from "react";
import { Col, Row, Container } from "../components/Grid";
import BookItem from '../components/BookItem';

import BookContext from '../utils/BookContext';

export default function SearchBooks() {

	const { books } = useContext(BookContext);
	
	return (
		<Container fluid className='my-5 mx-auto'>
			<Row>
				<Col>
					<h3>Saved Books</h3>
					{books && books.length ? (
						<Container>
							{books.map(book => (
								<BookItem key={book.id} book={{...book,isSaved: true}}/>
							))}
						</Container>
					) : (
						<p>No Results to Display</p>
					)}
				</Col>
			</Row>
		</Container>
	);
}
