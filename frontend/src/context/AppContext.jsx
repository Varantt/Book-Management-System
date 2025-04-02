import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const AppContext = createContext();

// AppProvider component to provide the context value
const AppProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [searchTerms, setSearchTerms] = useState({
        title: "",
        author: "",
        noOfPages: 0
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all books from the API
    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/books`);
            setBooks(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch books');
            console.error('Error fetching books:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch books on component mount
    useEffect(() => {
        fetchBooks();
    }, []);

    const onChangeHandler = (e, key) => {
        setSearchTerms({
            ...searchTerms,
            [key]: e.target.value      // Update dynamically
        });
    };

    const onRemoveHandler = async (id) => {
        try {
            await axios.delete(`${API_URL}/books/${id}`);
            // Update the books state by removing the deleted book
            setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
            setError(null);
        } catch (err) {
            setError('Failed to delete book');
            console.error('Error deleting book:', err);
        }
    };

    const onEditHandler = (id) => {
        // Find the book with the given id
        const bookToEdit = books.find(book => book.id === id);
        if (bookToEdit) {
            // Set the editing id
            setEditingId(id);

            // Set search terms to the values of the book being edited
            setSearchTerms({
                title: bookToEdit.bookTitle,
                author: bookToEdit.bookAuthor,
                noOfPages: bookToEdit.noOfPages
            });
        }
    };

    const onCheckedOutHandler = async (bookId) => {
        try {
            // Find the book that was clicked
            const updatedBooks = books.map(book => {
                if (book.id === bookId) {
                    // Toggle the isCheckedOut status
                    return { ...book, isCheckedOut: !book.isCheckedOut };
                }
                return book;
            });
    
            // Update the books state with the modified book
            setBooks(updatedBooks);
    
            // Optionally update the backend if you want to persist this change
            await axios.put(`${API_URL}/books/${bookId}`, { isCheckedOut: !updatedBooks.find(book => book.id === bookId).isCheckedOut });
    
        } catch (err) {
            console.error("Error updating book checkout status:", err);
        }
    };
    

    const addBook = async () => {
        const bookTitle = searchTerms.title;
        const bookAuthor = searchTerms.author;
        const noOfPages = searchTerms.noOfPages;

        const bookData = {
            bookTitle,
            bookAuthor,
            noOfPages: Number(noOfPages),
            isCheckedOut : false
        };

        try {
            if (editingId !== null) {
                // Update an existing book
                const response = await axios.put(`${API_URL}/books/${editingId}`, bookData);

                // Update the books state by replacing the edited book
                setBooks(prevBooks =>
                    prevBooks.map(book => book.id === editingId ? response.data : book)
                );

                // Reset editing id
                setEditingId(null);
            } else {
                // Add a new book
                const response = await axios.post(`${API_URL}/books`, bookData);

                // Add the new book to the list of books
                setBooks(prevBooks => [...prevBooks, response.data]);
            }

            // Reset the searchTerms to empty
            setSearchTerms({
                title: "",
                author: "",
                noOfPages: 0
            });

            setError(null);
        } catch (err) {
            setError(editingId ? 'Failed to update book' : 'Failed to add book');
            console.error('Error:', err);
        }
    };

    const cancelEdit = () => {
        // Reset editing state and form
        setEditingId(null);
        setSearchTerms({
            title: "",
            author: "",
            noOfPages: 0
        });
    };

    return (
        <AppContext.Provider value={{
            books,
            addBook,
            searchTerms,
            onChangeHandler,
            onRemoveHandler,
            onEditHandler,
            onCheckedOutHandler,
            editingId,
            cancelEdit,
            isLoading,
            error,
            searchTerm, 
            setSearchTerm
        }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext };