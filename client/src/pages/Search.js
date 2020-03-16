import React, { useState } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import BookItem from '../components/BookItem';

export default function SearchBooks() {
	// Setting our component's initial state
	const [books, setBooks] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	// Handles updating component state when the user types into the input field
	function handleInputChange(event) {
		const { value } = event.target;
		const saveValue = value.trim();
		if(saveValue) {
			setSearchTerm(saveValue);
		}
	};

	function handleFormSubmit(event) {
		event.preventDefault();
		if(searchTerm){
			API.searchBooks(searchTerm)
				.then(({ data }) => {console.log(data);setBooks(data)})
				.catch(err => console.log(err));
		}
	};

	return (
		<Container fluid className='my-5 mx-auto'>
			<Row className='border'>
				<Col>
					<form >
						<h3>Book</h3>
						<Input
							onChange={handleInputChange}
							name="book"
							placeholder="Book Title"
						/>
						<FormBtn
							onClick={handleFormSubmit}
						>
							Search
						</FormBtn>
					</form>
				</Col>
			</Row>
			<Row>
				<Col>
					<h3>Results</h3>
					{books.length ? (
						<Container>
							{books.map(book => (
								<BookItem key={book.id} book={book}/>
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
