const request = require('supertest');
const app = require('../app');
const clientes = require('../models/cliente');

beforeEach(() => {
  clientes.length = 0;
  clientes.push({ id: 1, matricula: '123', nome: 'Cliente 1', telefone: '123456789' });
});

describe('API de Clientes', () => {
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

  test('POST /clientes - deve criar um novo cliente', async () => {
    const novoCliente = { matricula: '456', nome: 'Cliente 2', telefone: '987654321' };
    const response = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(novoCliente.nome);
    expect(clientes.length).toBe(2);
  });

  test('PUT /clientes/:id - deve atualizar um cliente', async () => {
    const clienteAtualizado = { nome: 'Cliente Atualizado 1', telefone: '111111111' };
    const response = await request(app)
      .put('/clientes/1')
      .set('Authorization', `Bearer ${token}`)
      .send(clienteAtualizado);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(clienteAtualizado.nome);
  });

  test('DELETE /clientes/:id - deve deletar um cliente', async () => {
    const response = await request(app)
      .delete('/clientes/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
    expect(clientes.length).toBe(0);
  });
});
