const request = require('supertest');
const app = require('../app');
const { Cliente } = require('../../models');

beforeEach(async () => {
  await Cliente.destroy({ where: {} }); // Limpar tabela antes de cada teste
  await Cliente.create({ id: 1, matricula: '1234', nome: 'Cliente 1', telefone: '555-1234' });
});

describe('Cliente API', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'password' });
    token = response.body.token;
  });

  test('GET /clientes - deve retornar todos os clientes', async () => {
    const response = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('POST /clientes - deve criar e retornar um novo cliente', async () => {
    const novoCliente = { matricula: '5678', nome: 'Cliente 2', telefone: '555-5678' };
    const response = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(novoCliente.nome);

    const clientes = await Cliente.findAll();
    expect(clientes.length).toBe(2);
  });

  test('PUT /clientes/:id - deve atualizar e retornar o cliente atualizado', async () => {
    const clienteAtualizado = { matricula: '1234', nome: 'Cliente Atualizado 1', telefone: '555-1234' };
    const response = await request(app)
      .put('/clientes/1')
      .set('Authorization', `Bearer ${token}`)
      .send(clienteAtualizado);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(clienteAtualizado.nome);

    const cliente = await Cliente.findByPk(1);
    expect(cliente.nome).toBe(clienteAtualizado.nome);
  });

  test('DELETE /clientes/:id - deve deletar o cliente e retornar no content', async () => {
    const response = await request(app)
      .delete('/clientes/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);

    const clientes = await Cliente.findAll();
    expect(clientes.length).toBe(0);
  });
});
