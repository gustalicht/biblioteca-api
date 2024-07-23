const Emprestimo  = require('../../models/emprestimo');
const Cliente = require('../../models/cliente');
const Livro = require('../../models/livro')


exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Emprestimo.findAll();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao encontrar os emprestimos', error });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const loan = await Emprestimo.findByPk(req.params.id);
    if (loan) {
      res.status(200).json(loan);
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao encontrar o emprestimo', error });
  }
};

exports.createLoan = async (req, res) => {
  const cliente = await Cliente.findByPk(req.body.clienteId);
  const livro = await Livro.findByPk(req.body.livroId);

  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }

  if (!livro || !livro.disponivel) {
    return res.status(404).json({ message: 'Livro não encontrado ou não disponível' });
  }

  const emprestimosAtivos = await Emprestimo.count({
    where: {
      clienteId: cliente.id,
      returned: false
    }
  });

  if (emprestimosAtivos >= 3) {
    return res.status(400).json({ message: 'Cliente já possui 3 empréstimos ativos' });
  }

  const loanDate = new Date();
  const returnDate = req.body.testMode ? new Date(Date.now() + 1 * 60 * 1000) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 dias ou 1 minuto para teste

  try {
    const loan = await Emprestimo.create({
      clienteId: cliente.id,
      livroId: livro.id,
      loanDate,
      returnDate,
      returned: false
    });

    livro.disponivel = false;
    await livro.save();

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar empréstimo', error });
  }

};

exports.updateLoan = async (req, res) => {
  const { clienteId, livroId, loanDate, returnDate, returned } = req.body;

  // Verifica se nenhum campo foi enviado
  if (!clienteId && !livroId) {
    return res.status(400).json({ message: 'Você deve preencher pelo menos um campo para atualizar!' });
  }

  try {
    const [updated] = await Loan.update(
      { clienteId, livroId, loanDate, returnDate, returned },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedLoan = await Loan.findByPk(req.params.id);
      res.status(200).json(updatedLoan);
    } else {
      res.status(404).json({ message: 'Empréstimo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar empréstimo', error });
  }
};


exports.deleteLoan = async (req, res) => {
  try {
    const deleted = await Emprestimo.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Emprestimo não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o emprestimo!', error });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const loan = await Emprestimo.findByPk(req.params.id);
    if (loan) {
      loan.returned = true;
      await loan.save();
      const book = await Livro.findByPk(loan.livroId);
      if (book) {
        book.available = true;
        await book.save();
      }
      res.status(200).json(loan);
    } else {
      res.status(404).json({ message: 'Emprestimo não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao retornar o livro!', error });
  }
};
