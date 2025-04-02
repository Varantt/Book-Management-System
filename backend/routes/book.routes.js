module.exports = app => {
    const books = require("../controllers/book.controller.js");
  
    // Create a new Book
    app.post("/api/books", books.create);
  
    // Retrieve all Books
    app.get("/api/books", books.findAll);
  
    // Retrieve a single Book with bookId
    app.get("/api/books/:id", books.findOne);
  
    // Update a Book with bookId
    app.put("/api/books/:id", books.update);
  
    // Delete a Book with bookId
    app.delete("/api/books/:id", books.delete);
  };