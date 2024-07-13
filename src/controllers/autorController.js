const autores = require('../models/autor');

exports.getAllAuthors = (req, res) => {
  try {
    res.status(200).json(autores);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar autores' });
  }
};

exports.getAuthorById = (req, res) => {
  try {
    const autor = autores.find(a => a.id === parseInt(req.params.id));
    if (autor) {
      res.status(200).json(autor);
    } else {
      res.status(404).json({ message: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar autor' });
  }
};

exports.createAuthor = (req, res) => {
  try {
    const autor = {
      id: autores.length + 1,
      nome: req.body.nome,
      pais: req.body.pais
    };
    autores.push(autor);
    res.status(201).json(autor);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar autor' });
  }
};

exports.updateAuthor = (req, res) => {
  try {
    const autor = autores.find(a => a.id === parseInt(req.params.id));
    if (autor) {
      autor.nome = req.body.nome || autor.nome;
      autor.pais = req.body.pais || autor.pais;
      res.status(200).json(autor);
    } else {
      res.status(404).json({ message: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar autor' });
  }
};

exports.deleteAuthor = (req, res) => {
  try {
    const index = autores.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
      autores.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar autor' });
  }
};
