const loans = require('../models/emprestimo');
const books = require('../models/livro');
const clients = require('../models/cliente');

exports.getAllLoans = (req, res) => {
  res.status(200).json(loans);
};

exports.createLoan = (req, res) => {
  const client = clients.find(c => c.id === parseInt(req.body.clientId));
  const book = books.find(b => b.id === parseInt(req.body.bookId));

  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }

  if (!book || !book.available) {
    return res.status(404).json({ message: 'Book not found or not available' });
  }

  const activeLoans = loans.filter(loan => loan.clientId === client.id && !loan.returned);
  if (activeLoans.length >= 3) {
    return res.status(400).json({ message: 'Client already has 3 active loans' });
  }

  const loan = {
    id: loans.length + 1,
    clientId: client.id,
    bookId: book.id,
    dateTaken: new Date(),
    dateDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    returned: false
  };

  loans.push(loan);
  book.available = false;
  res.status(201).json(loan);
};

exports.returnBook = (req, res) => {
  const loan = loans.find(l => l.id === parseInt(req.params.id));

  if (!loan) {
    return res.status(404).json({ message: 'Loan not found' });
  }

  if (loan.returned) {
    return res.status(400).json({ message: 'Book already returned' });
  }

  loan.returned = true;
  const book = books.find(b => b.id === loan.bookId);
  if (book) {
    book.available = true;
  }

  const dateReturned = new Date();
  const daysLate = Math.max(0, (dateReturned - new Date(loan.dateDue)) / (1000 * 60 * 60 * 24));
  res.status(200).json({ loan, daysLate });
};
