const express = require('express');
const bodyParser = require('body-parser');
const authorRoutes = require('./routes/autorRoutes');
const bookRoutes = require('./routes/livroRoutes');
const clientRoutes = require('./routes/clienteRoutes');
const loanRoutes = require('./routes/emprestimoRoutes');
const jwt = require('jsonwebtoken');
const setupSwagger = require('./swagger');

const app = express();

app.use(bodyParser.json());
setupSwagger(app);
app.use('/autores', authorRoutes);
app.use('/livros', bookRoutes);
app.use('/clientes', clientRoutes);
app.use('/emprestimos', loanRoutes);

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: API para autenticação
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz login e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *             example:
 *               username: user
 *               password: password
 *     responses:
 *       200:
 *         description: Sucesso ao fazer login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT
 *       401:
 *         description: Falha na autenticação
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulação de autenticação. Em produção, substitua por verificação de credenciais no banco de dados.
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ id: 1, username: 'user' }, 'secret');
    return res.status(200).json({ token });
  }

  res.status(401).json({ error: 'Autenticação inválida.' });
});

module.exports = app;
