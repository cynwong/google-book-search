import axios from "axios";

export default {
	
	// Deletes the book with the given id
	deleteBook: function(id) {
		return axios.delete("/api/books/" + id);
	},
	// Gets all books
	getBooks: function() {
		return axios.get("/api/books");
	},
	// Gets the book with the given id
	getBook: function(id) {
		return axios.get("/api/books/" + id);
	},
	// Search books
	searchBooks: function(searchTerm) {
		return axios.get(`/api/search/${searchTerm}`);
	},
	// Saves a book to the database
	saveBook: function(bookData) {
		return axios.post("/api/books", bookData);
	}
};
