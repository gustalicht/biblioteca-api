const emprestimos = require('../models/emprestimo');
const livros = require('../models/livro');
const clientes = require('../models/cliente');

exports.getAllLoans = (req, res) => {
  try {
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar empréstimos' });
  }
};

exports.createLoan = (req, res) => {
  try {
    const cliente = clientes.find(c => c.id === parseInt(req.body.clientId));
    const livro = livros.find(b => b.id === parseInt(req.body.bookId));

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    if (!livro || !livro.disponivel) {
      return res.status(404).json({ message: 'Livro não encontrado ou não disponível' });
    }

    const emprestimosAtivos = emprestimos.filter(emprestimo => emprestimo.clientId === cliente.id && !emprestimo.returned);
    if (emprestimosAtivos.length >= 3) {
      return res.status(400).json({ message: 'Cliente já possui 3 empréstimos ativos' });
    }

    const emprestimo = {
      id: emprestimos.length + 1,
      clientId: cliente.id,
      bookId: livro.id,
      dateTaken: new Date(),
      dateDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dias depois
      returned: false
    };

    emprestimos.push(emprestimo);
    livro.disponivel = false;
    res.status(201).json(emprestimo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar empréstimo' });
  }
};

exports.returnBook = (req, res) => {
  try {
    const emprestimo = emprestimos.find(l => l.id === parseInt(req.params.id));

    if (!emprestimo) {
      return res.status(404).json({ message: 'Empréstimo não encontrado' });
    }

    if (emprestimo.returned) {
      return res.status(400).json({ message: 'Livro já devolvido' });
    }

    emprestimo.returned = true;
    const livro = livros.find(b => b.id === emprestimo.bookId);
    if (livro) {
      livro.disponivel = true;
    }

    const dateReturned = new Date();
    const daysLate = Math.max(0, (dateReturned - new Date(emprestimo.dateDue)) / (1000 * 60 * 60 * 24));
    res.status(200).json({ emprestimo, daysLate });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao devolver livro' });
  }
};
