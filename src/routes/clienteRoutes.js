const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clienteController');
const auth = require('../middleware/auth');
/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - matricula
 *         - nome
 *         - telefone
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do cliente
 *         matricula:
 *           type: string
 *           description: Matrícula do cliente
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *         telefone:
 *           type: string
 *           description: Telefone do cliente
 *       example:
 *         id: 1
 *         matricula: 123456
 *         nome: João Silva
 *         telefone: 999999999
 */

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: API para gerenciar clientes
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/', auth, clientController.getAllClients);
/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado pelo ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 */

router.get('/:id', auth, clientController.getClientById);
/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Erro ao criar cliente
 */
router.post('/', auth, clientController.createClient);
/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao atualizar cliente
 */
router.put('/:id', auth, clientController.updateClient);
/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       204:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro ao deletar cliente
 */
router.delete('/:id', auth, clientController.deleteClient);

module.exports = router;
