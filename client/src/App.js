import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Search from "./pages/Search";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

import BookContext from './utils/BookContext';
import API from "./utils/API";

function App() {
	const [books, setBooks] = useState([]);

	useEffect(()=> {
		API.getBooks()
			.then(({data}) => {
				setBooks(data);
			})
			.catch((error) => {
				console.log(error)
			})
	}, []);

	const saveBook = (book) => {
		API
			.saveBook(book)
			.then(({data}) => {
				setBooks([...books,data])
			})
			.catch(err => console.error(err));
	}
	const deleteBook = (bookId) => {
		API
			.deleteBook(bookId)
			.then((_) => setBooks(books.filter((b)=> b.googleId !== bookId)) )
			.catch(err => console.error(err));
	}

	const AppContent = {
		books,
		saveBook,
		deleteBook
	}

	return (
		<Router>
		<div>
			<Nav />
			<BookContext.Provider value={AppContent}>
				<Switch>
					<Route exact path="/" component={Search} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/saved" component={Saved} />
					<Route component={NoMatch} />
				</Switch>
			</BookContext.Provider>
		</div>
		</Router>
	);
}

export default App;
