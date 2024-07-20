const { Livro } = require('../../models');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Livro.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Livro.findByPk(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

exports.createBook = async (req, res) => {
  const { isbn, title, authors, publisher, year, available } = req.body;
  if (!isbn || !title || !authors || !publisher || !year || available === undefined) {
    return res.status(400).json({ message: 'The fields isbn, title, authors, publisher, year, and available are required' });
  }

  try {
    const book = await Livro.create({ isbn, title, authors, publisher, year, available });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

exports.updateBook = async (req, res) => {
  const { isbn, title, authors, publisher, year, available } = req.body;
  if (!isbn || !title || !authors || !publisher || !year || available === undefined) {
    return res.status(400).json({ message: 'The fields isbn, title, authors, publisher, year, and available are required' });
  }

  try {
    const [updated] = await Livro.update({ isbn, title, authors, publisher, year, available }, { where: { id: req.params.id } });
    if (updated) {
      const updatedBook = await Livro.findByPk(req.params.id);
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Livro.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};
