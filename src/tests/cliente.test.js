const request = require('supertest');
const app = require('../src/app');
const clientes = require('../src/models/cliente');

beforeEach(() => {
  clientes.length = 0;
  clientes.push({ id: 1, matricula: '123', nome: 'Cliente 1', telefone: '123456789' });
});

describe('API de Clientes', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app).post('/login');
    token = response.body.token;
  });

  test('GET /clients - deve retornar todos os clientes', async () => {
    const response = await request(app)
      .get('/clients')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('POST /clients - deve criar um novo cliente', async () => {
    const novoCliente = { matricula: '456', nome: 'Cliente 2', telefone: '987654321' };
    const response = await request(app)
      .post('/clients')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(novoCliente.nome);
    expect(clientes.length).toBe(2);
  });

  test('PUT /clients/:id - deve atualizar um cliente', async () => {
    const clienteAtualizado = { nome: 'Cliente Atualizado 1', telefone: '111111111' };
    const response = await request(app)
      .put('/clients/1')
      .set('Authorization', `Bearer ${token}`)
      .send(clienteAtualizado);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(clienteAtualizado.nome);
  });

  test('DELETE /clients/:id - deve deletar um cliente', async () => {
    const response = await request(app)
      .delete('/clients/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
    expect(clientes.length).toBe(0);
  });
});
