const books = require('../models/livro');

exports.getAllBooks = (req, res) => {
  res.status(200).json(books);
};

exports.getBookById = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

exports.createBook = (req, res) => {
  const book = {
    id: books.length + 1,
    isbn: req.body.isbn,
    title: req.body.title,
    authors: req.body.authors,
    publisher: req.body.publisher,
    year: req.body.year,
    available: true
  };
  books.push(book);
  res.status(201).json(book);
};

exports.updateBook = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    book.isbn = req.body.isbn || book.isbn;
    book.title = req.body.title || book.title;
    book.authors = req.body.authors || book.authors;
    book.publisher = req.body.publisher || book.publisher;
    book.year = req.body.year || book.year;
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

exports.deleteBook = (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    books.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};
