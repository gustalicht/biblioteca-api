const clients = require('../models/cliente');

exports.getAllClients = (req, res) => {
  res.status(200).json(clients);
};

exports.getClientById = (req, res) => {
  const client = clients.find(c => c.id === parseInt(req.params.id));
  if (client) {
    res.status(200).json(client);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};

exports.createClient = (req, res) => {
  const client = {
    id: clients.length + 1,
    registration: req.body.registration,
    name: req.body.name,
    phone: req.body.phone
  };
  clients.push(client);
  res.status(201).json(client);
};

exports.updateClient = (req, res) => {
  const client = clients.find(c => c.id === parseInt(req.params.id));
  if (client) {
    client.registration = req.body.registration || client.registration;
    client.name = req.body.name || client.name;
    client.phone = req.body.phone || client.phone;
    res.status(200).json(client);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};

exports.deleteClient = (req, res) => {
  const index = clients.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    clients.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};
