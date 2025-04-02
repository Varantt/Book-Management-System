import { useAppContext } from "../../context/AppContext";
import Book from "../book/Book";
import "./book-addition-form.css";

const BookAdditionForm = () => {
    const { searchTerms, onChangeHandler, addBook, books, setSearchTerm, searchTerm } = useAppContext();

    const filteredBooks = books.filter((book) =>
        book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div id="book-addition-form">
                <div className="title input">
                    <input
                        required
                        placeholder="Title"
                        type="text"
                        value={searchTerms.title}
                        onChange={(e) => onChangeHandler(e, "title")}
                    />
                </div>

                <div className="author input">
                    <input
                        required
                        placeholder="Author"
                        type="text"
                        value={searchTerms.author}
                        onChange={(e) => onChangeHandler(e, "author")}
                    />
                </div>

                <div className="number-of-pages input">
                    <input
                        placeholder="Number Of Pages"
                        type="number"
                        value={searchTerms.noOfPages}
                        onChange={(e) => onChangeHandler(e, "noOfPages")}
                    />
                </div>

                <div className="submit-btn" onClick={addBook}>
                    Add
                </div>
            </div>

            {books.length > 0 && (
                <div className="existing-books">
                    <div className="search-book">
                        <input
                            type="text"
                            placeholder="Search by Title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on change
                        />
                    </div>

                    {/* Map over the filtered books */}
                    {filteredBooks.map((book) => (
                        <Book
                            key={book.id}
                            id={book.id}
                            bookTitle={book.bookTitle}
                            bookAuthor={book.bookAuthor}
                            noOfPages={book.noOfPages}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default BookAdditionForm;
