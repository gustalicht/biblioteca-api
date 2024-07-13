const clientes = require('../models/cliente');

exports.getAllClients = (req, res) => {
  try {
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes' });
  }
};

exports.getClientById = (req, res) => {
  try {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente' });
  }
};

exports.createClient = (req, res) => {
  try {
    const cliente = {
      id: clientes.length + 1,
      matricula: req.body.matricula,
      nome: req.body.nome,
      telefone: req.body.telefone
    };
    clientes.push(cliente);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente' });
  }
};

exports.updateClient = (req, res) => {
  try {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (cliente) {
      cliente.matricula = req.body.matricula || cliente.matricula;
      cliente.nome = req.body.nome || cliente.nome;
      cliente.telefone = req.body.telefone || cliente.telefone;
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente' });
  }
};

exports.deleteClient = (req, res) => {
  try {
    const index = clientes.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
      clientes.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar cliente' });
  }
};
