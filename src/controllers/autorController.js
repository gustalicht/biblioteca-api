const { Autor } = require('../../models');

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Autor.findAll();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching authors', error });
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const author = await Autor.findByPk(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching author', error });
  }
};

exports.createAuthor = async (req, res) => {
  const { name, country } = req.body;
  if (!name || !country) {
    return res.status(400).json({ message: 'The fields name and country are required' });
  }

  try {
    const author = await Autor.create({ name, country });
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error creating author', error });
  }
};

exports.updateAuthor = async (req, res) => {
  const { name, country } = req.body;
  if (!name || !country) {
    return res.status(400).json({ message: 'The fields name and country are required' });
  }

  try {
    const [updated] = await Autor.update({ name, country }, { where: { id: req.params.id } });
    if (updated) {
      const updatedAuthor = await Autor.findByPk(req.params.id);
      res.status(200).json(updatedAuthor);
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating author', error });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const deleted = await Autor.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting author', error });
  }
};
