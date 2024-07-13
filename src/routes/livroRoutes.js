const express = require('express');
const router = express.Router();
const bookController = require('../controllers/livroController');
const auth = require('../middleware/auth');


/**
 * @swagger
 * components:
 *   schemas:
 *     Livro:
 *       type: object
 *       required:
 *         - isbn
 *         - titulo
 *         - autores
 *         - editora
 *         - ano
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do livro
 *         isbn:
 *           type: string
 *           description: ISBN do livro
 *         titulo:
 *           type: string
 *           description: Título do livro
 *         autores:
 *           type: array
 *           items:
 *             type: string
 *           description: Autores do livro
 *         editora:
 *           type: string
 *           description: Editora do livro
 *         ano:
 *           type: integer
 *           description: Ano de publicação do livro
 *         disponivel:
 *           type: boolean
 *           description: Disponibilidade do livro
 *       example:
 *         id: 1
 *         isbn: 1234567890
 *         titulo: Livro Exemplo
 *         autores: ["Autor 1", "Autor 2"]
 *         editora: Editora Exemplo
 *         ano: 2022
 *         disponivel: true
 */

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: API para gerenciar livros
 */

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Retorna todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
router.get('/', auth, bookController.getAllBooks);
/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Retorna um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado pelo ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', auth, bookController.getBookById);
/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       500:
 *         description: Erro ao criar livro
 */
router.post('/', auth, bookController.createBook);
/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro ao atualizar livro
 */
router.put('/:id', auth, bookController.updateBook);
/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Deleta um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     responses:
 *       204:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro ao deletar livro
 */
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
