const { Cliente } = require('../../models');
const logger = require('../utils/logger');

exports.getAllClients = async (req, res) => {
  logger.info('ta chegando aqui');
  try {
    const clients = await Cliente.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao encontrar clientes', error });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Cliente.findByPk(req.params.id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao encontrar Cliente!', error });
  }
};

exports.createClient = async (req, res) => {
  const { matricula, nome, telefone } = req.body;
  if (!matricula || !nome || !telefone) {
    return res.status(400).json({ message: 'O registro, nome e telefone são obrigatorios!' });
  }

  try {
    const client = await Cliente.create({ matricula, nome, telefone });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente!', error });
  }
};
exports.updateClient = async (req, res) => {
  const { matricula, nome, telefone } = req.body;

  // Verifica se nenhum campo foi enviado
  if (!matricula && !nome && !telefone) {
    return res.status(400).json({ message: 'Você deve preencher pelo menos um campo para atualizar!' });
  }

  try {
    const [updated] = await Cliente.update(
      { matricula, nome, telefone },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedClient = await Cliente.findByPk(req.params.id);
      res.status(200).json(updatedClient);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error });
  }
};


exports.deleteClient = async (req, res) => {
  try {
    const deleted = await Cliente.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Cliente não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar cliente!', error });
  }
};
