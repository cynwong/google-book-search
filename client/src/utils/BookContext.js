import { createContext } from 'react';

const BookContext = createContext({
	books:[],
	deleteBook: () => undefined,
	saveBook: () => undefined
});

export default BookContext;