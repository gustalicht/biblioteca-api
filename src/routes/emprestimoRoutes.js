const express = require('express');
const router = express.Router();
const loanController = require('../controllers/emprestimosController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Emprestimo:
 *       type: object
 *       required:
 *         - clienteId
 *         - livroId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do empréstimo
 *         clienteId:
 *           type: integer
 *           description: ID do cliente
 *         livroId:
 *           type: integer
 *           description: ID do livro
 *         dataEmprestimo:
 *           type: string
 *           format: date
 *           description: Data do empréstimo
 *         dataDevolucao:
 *           type: string
 *           format: date
 *           description: Data de devolução
 *         devolvido:
 *           type: boolean
 *           description: Status de devolução
 *       example:
 *         id: 1
 *         clienteId: 1
 *         livroId: 1
 *         dataEmprestimo: 2022-10-01T00:00:00.000Z
 *         dataDevolucao: 2022-10-15T00:00:00.000Z
 *         devolvido: false
 */

/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: API para gerenciar empréstimos
 */

/**
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Retorna todos os empréstimos
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emprestimo'
 */
router.get('/', auth, loanController.getAllLoans);

/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Cria um novo empréstimo
 *     tags: [Empréstimos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Emprestimo'
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       500:
 *         description: Erro ao criar empréstimo
 */
router.post('/', auth, loanController.createLoan);
/**
 * @swagger
 * /emprestimos/{id}/devolver:
 *   post:
 *     summary: Devolve um livro emprestado
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro ao devolver livro
 */
router.post('/:id/return', auth, loanController.returnBook);

module.exports = router;
