const authors = require('../models/autor');

exports.getAllAuthors = (req, res) => {
  res.status(200).json(authors);
};

exports.getAuthorById = (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
};

exports.createAuthor = (req, res) => {
  const author = {
    id: authors.length + 1,
    name: req.body.name,
    country: req.body.country
  };
  authors.push(author);
  res.status(201).json(author);
};

exports.updateAuthor = (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (author) {
    author.name = req.body.name || author.name;
    author.country = req.body.country || author.country;
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
};

exports.deleteAuthor = (req, res) => {
  const index = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
    authors.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
};
