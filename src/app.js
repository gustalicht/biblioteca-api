const express = require('express');
const bodyParser = require('body-parser');
const authorRoutes = require('./routes/autorRoutes');
const bookRoutes = require('./routes/livroRoutes');
const clientRoutes = require('./routes/clienteRoutes');
const loanRoutes = require('./routes/emprestimoRoutes');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.use('/clients', clientRoutes);
app.use('/loans', loanRoutes);

app.post('/login', (req, res) => {
  const token = jwt.sign({ id: 1, username: 'user' }, 'secret');
  res.status(200).json({ token });
});

module.exports = app;
