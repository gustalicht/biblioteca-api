const livros = require('../models/livro');

exports.getAllBooks = (req, res) => {
  try {
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar livros' });
  }
};

exports.getBookById = (req, res) => {
  try {
    const livro = livros.find(b => b.id === parseInt(req.params.id));
    if (livro) {
      res.status(200).json(livro);
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar livro' });
  }
};

exports.createBook = (req, res) => {
  try {
    const livro = {
      id: livros.length + 1,
      isbn: req.body.isbn,
      titulo: req.body.titulo,
      autores: req.body.autores,
      editora: req.body.editora,
      ano: req.body.ano,
      disponivel: true
    };
    livros.push(livro);
    res.status(201).json(livro);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar livro' });
  }
};

exports.updateBook = (req, res) => {
  try {
    const livro = livros.find(b => b.id === parseInt(req.params.id));
    if (livro) {
      livro.isbn = req.body.isbn || livro.isbn;
      livro.titulo = req.body.titulo || livro.titulo;
      livro.autores = req.body.autores || livro.autores;
      livro.editora = req.body.editora || livro.editora;
      livro.ano = req.body.ano || livro.ano;
      res.status(200).json(livro);
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar livro' });
  }
};

exports.deleteBook = (req, res) => {
  try {
    const index = livros.findIndex(b => b.id === parseInt(req.params.id));
    if (index !== -1) {
      livros.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar livro' });
  }
};
