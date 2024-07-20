const { Livro } = require('../../models');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Livro.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os livros!', error });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Livro.findByPk(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Livro não encontrado!!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o livro!', error });
  }
};

exports.createBook = async (req, res) => {
  const { isbn, titulo, autores, editora, ano, disponivel } = req.body;
  if (!isbn || !titulo || !autores || !editora || !ano || disponivel === undefined) {
    return res.status(400).json({ message: 'todos os campos são obrigatorios!' });
  }

  try {
    const book = await Livro.create({ isbn, titulo, autores, editora, ano, disponivel });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o livro!', error });
  }
};

exports.updateBook = async (req, res) => {
  const { isbn, titulo, autores, editora, ano, disponivel } = req.body;

  // Verifica se nenhum campo foi enviado
  if (!isbn && !titulo && !autores && !editora && !ano && disponivel === undefined) {
    return res.status(400).json({ message: 'Você deve preencher pelo menos um campo para atualizar!' });
  }

  try {
    const [updated] = await Livro.update(
      { isbn, titulo, autores, editora, ano, disponivel },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedBook = await Livro.findByPk(req.params.id);
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar livro', error });
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Livro.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o livro!', error });
  }
};
