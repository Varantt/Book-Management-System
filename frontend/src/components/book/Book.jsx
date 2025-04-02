import { useAppContext } from "../../context/AppContext";
import "./book.css";

const Book = ({ bookTitle, bookAuthor, noOfPages, id }) => {
    const {
        onRemoveHandler, onEditHandler, onCheckedOutHandler
    } = useAppContext();

    return (
        <div className="book">
            <div className="book-header">
                {/* Only show title if available */}
                {bookTitle && <h3>{bookTitle}</h3>}

                {/* Only show author if available */}
                {bookAuthor && <p>{bookAuthor}</p>}
            </div>
            <div className="book-footer">
                <div className="action-container">
                    <div className="remove-btn" onClick={() => onRemoveHandler(id)}>
                        &times;
                    </div>

                    <div className="edit-btn" onClick={() => onEditHandler(id)}>
                        ✏️
                    </div>

                    <div className="checkout-btn" onClick={() => onCheckedOutHandler(id)}>
                        &#10004
                    </div>
                </div>

                {/* Only show page count if it's greater than 0 */}
                {noOfPages > 0 && <span>{noOfPages} pages</span>}
            </div>
        </div>
    );
};

export default Book;