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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Obtém um empréstimo pelo ID
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Empréstimo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro ao buscar empréstimo
 */

router.get('/:id', auth, loanController.getLoanById);
/**
 * @swagger
 * /emprestimos/{id}:
 *   put:
 *     summary: Atualiza um empréstimo pelo ID
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do empréstimo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *               loanDate:
 *                 type: string
 *                 format: date
 *               returnDate:
 *                 type: string
 *                 format: date
 *               returned:
 *                 type: boolean
 *             example:
 *               clientId: 1
 *               bookId: 1
 *               loanDate: 2023-07-20
 *               returnDate: 2023-08-20
 *               returned: false
 *     responses:
 *       200:
 *         description: Empréstimo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro ao atualizar empréstimo
 */

router.put('/:id', auth, loanController.updateLoan);
/**
 * @swagger
 * /emprestimos/{id}:
 *   delete:
 *     summary: Exclui um empréstimo pelo ID
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do empréstimo
 *     responses:
 *       204:
 *         description: Empréstimo excluído com sucesso
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro ao excluir empréstimo
 */

router.delete('/:id', auth, loanController.deleteLoan);

module.exports = router;
