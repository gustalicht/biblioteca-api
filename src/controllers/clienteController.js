const { Cliente } = require('../../models');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Cliente.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Cliente.findByPk(req.params.id);
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client', error });
  }
};

exports.createClient = async (req, res) => {
  const { registration, name, phone } = req.body;
  if (!registration || !name || !phone) {
    return res.status(400).json({ message: 'The fields registration, name, and phone are required' });
  }

  try {
    const client = await Cliente.create({ registration, name, phone });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client', error });
  }
};

exports.updateClient = async (req, res) => {
  const { registration, name, phone } = req.body;
  if (!registration || !name || !phone) {
    return res.status(400).json({ message: 'The fields registration, name, and phone are required' });
  }

  try {
    const [updated] = await Cliente.update({ registration, name, phone }, { where: { id: req.params.id } });
    if (updated) {
      const updatedClient = await Cliente.findByPk(req.params.id);
      res.status(200).json(updatedClient);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deleted = await Cliente.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error });
  }
};
