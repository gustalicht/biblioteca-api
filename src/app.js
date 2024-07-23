const express = require('express');
const bodyParser = require('body-parser');
const authorRoutes = require('./routes/autorRoutes');
const bookRoutes = require('./routes/livroRoutes');
const clientRoutes = require('./routes/clienteRoutes');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const auth = require('./middleware/auth');
const loanRoutes = require('./routes/emprestimoRoutes');
const jwt = require('jsonwebtoken');
const setupSwagger = require('./swagger');
const { User } = require('../models/users');

const app = express();

app.use(bodyParser.json());
app.use(loggerMiddleware);
setupSwagger(app);
app.use('/autores',auth, authorRoutes);
app.use('/livros', auth,bookRoutes);
app.use('/clientes',auth, clientRoutes);
app.use('/emprestimos',auth, loanRoutes);

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
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Autenticação inválida.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'secret');
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor.' });
  }});
module.exports = app;
