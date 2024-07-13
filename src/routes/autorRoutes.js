const express = require('express');
const router = express.Router();
const authorController = require('../controllers/autorController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Autor:
 *       type: object
 *       required:
 *         - nome
 *         - pais
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do autor
 *         nome:
 *           type: string
 *           description: Nome do autor
 *         pais:
 *           type: string
 *           description: País do autor
 *       example:
 *         id: 1
 *         nome: J.K. Rowling
 *         pais: Reino Unido
 */

/**
 * @swagger
 * tags:
 *   name: autores
 *   descrição: API para gerenciar autores
 */

/**
 * @swagger
 * /autores:
 *   get:
 *     summary: Retorna todos os autores
 *     tags: [autores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autor'
 */
router.get('/', auth, authorController.getAllAuthors);
/**
 * @swagger
 * /autores/{id}:
 *   get:
 *     summary: Retorna um autor pelo ID
 *     tags: [autores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor encontrado pelo ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Autor não encontrado
 */

router.get('/:id', auth, authorController.getAuthorById);
/**
 * @swagger
 * /autores:
 *   post:
 *     summary: Cria um novo autor
 *     tags: [autores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       500:
 *         description: Erro ao criar autor
 */
router.post('/', auth, authorController.createAuthor);
/**
 * @swagger
 * /autores/{id}:
 *   put:
 *     summary: Atualiza um autor pelo ID
 *     tags: [autores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Erro ao atualizar autor
 */
router.put('/:id', auth, authorController.updateAuthor);

/**
 * @swagger
 * /autores/{id}:
 *   delete:
 *     summary: Deleta um autor pelo ID
 *     tags: [autores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do autor
 *     responses:
 *       204:
 *         description: Autor deletado com sucesso
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Erro ao deletar autor
 */

router.delete('/:id', auth, authorController.deleteAuthor);

module.exports = router;


