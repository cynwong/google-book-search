import React, { useState, useContext } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import BookItem from '../components/BookItem';

import BookContext from '../utils/BookContext';

export default function SearchBooks() {
	const { books: savedBooks } = useContext(BookContext);
	// Setting our component's initial state
	const [searchedBooks, setSearchedBooks] = useState([])
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
				.then(({ data }) => setSearchedBooks(data))
				.catch(err => console.log(err));
		}
	};

	function displaySearchResults(){
		return searchedBooks.map((book) => {
			const displayBook = book;
			displayBook.isSaved = savedBooks.find((b) => b.googleId === book.id )  ? true : false;
			return (<BookItem key={book.id} book={displayBook}/>);
		})
	}

	return (
		<Container fluid className='my-5 mx-auto'>
			<Row className='border'>
				<Col className='offset-1' size='9'>
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
					{searchedBooks.length ? (
						<Container>
							{displaySearchResults()}
						</Container>
					) : (
						<p>No Results to Display</p>
					)}
				</Col>
			</Row>
		</Container>
	);
}
