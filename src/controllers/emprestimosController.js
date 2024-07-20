const { Emprestimo, Cliente, Livro } = require('../../models');

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Emprestimo.findAll();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error });
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
    res.status(500).json({ message: 'Error fetching loan', error });
  }
};

exports.createLoan = async (req, res) => {
  const { clientId, bookId, loanDate, returnDate, returned } = req.body;
  if (!clientId || !bookId || !loanDate || !returnDate || returned === undefined) {
    return res.status(400).json({ message: 'The fields clientId, bookId, loanDate, returnDate, and returned are required' });
  }

  try {
    const loan = await Emprestimo.create({ clientId, bookId, loanDate, returnDate, returned });
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan', error });
  }
};

exports.updateLoan = async (req, res) => {
  const { clientId, bookId, loanDate, returnDate, returned } = req.body;
  if (!clientId || !bookId || !loanDate || !returnDate || returned === undefined) {
    return res.status(400).json({ message: 'The fields clientId, bookId, loanDate, returnDate, and returned are required' });
  }

  try {
    const [updated] = await Emprestimo.update({ clientId, bookId, loanDate, returnDate, returned }, { where: { id: req.params.id } });
    if (updated) {
      const updatedLoan = await Emprestimo.findByPk(req.params.id);
      res.status(200).json(updatedLoan);
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan', error });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const deleted = await Emprestimo.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan', error });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const loan = await Emprestimo.findByPk(req.params.id);
    if (loan) {
      loan.returned = true;
      await loan.save();
      const book = await Livro.findByPk(loan.bookId);
      if (book) {
        book.available = true;
        await book.save();
      }
      res.status(200).json(loan);
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error });
  }
};
