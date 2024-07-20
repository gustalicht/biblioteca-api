const { Autor } = require('../../models');

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Autor.findAll();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os autores', error });
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const author = await Autor.findByPk(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar autor.', error });
  }
};

exports.createAuthor = async (req, res) => {
  const { nome, pais } = req.body;
  if (!nome || !pais) {
    return res.status(400).json({ message: 'O nome e o pais são obrigatórios!' });
  }

  try {
    const author = await Autor.create({ nome, pais });
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar autor', error });
  }
};

exports.updateAuthor = async (req, res) => {
  const { nome, pais } = req.body;
  if (!nome || !pais) {
    return res.status(400).json({ message: 'Nome e Pais são obrigatorios!' });
  }

  try {
    const [updated] = await Autor.update({ nome, pais }, { where: { id: req.params.id } });
    if (updated) {
      const updatedAuthor = await Autor.findByPk(req.params.id);
      res.status(200).json(updatedAuthor);
    } else {
      res.status(404).json({ message: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o Autor!', error });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const deleted = await Autor.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar autor!', error });
  }
};
