const request = require('supertest');
const app = require('../app');
const authors = require('../models/autor');

beforeEach(() => {
  authors.length = 0;
  authors.push({ id: 1, nome: 'Author 1', pais: 'pais 1' });
});

describe('Autor API', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app).post('/login');
    token = response.body.token;
  });

  test('GET /autores - Deve retornar todos os autores', async () => {
    const response = await request(app)
      .get('/autores')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('POST /autores - retornar o autor que foi criado', async () => {
    const newAuthor = { nome: 'Author 2', pais: 'pais 2' };
    const response = await request(app)
      .post('/autores')
      .set('Authorization', `Bearer ${token}`)
      .send(newAuthor);
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(newAuthor.nome);
    expect(authors.length).toBe(2);
  });

  test('PUT /autores/:id - retornar o autor que foi atualizado', async () => {
    const updatedAuthor = { nome: 'Updated Author 1', pais: 'Updated pais 1' };
    const response = await request(app)
      .put('/autores/1')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedAuthor);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(updatedAuthor.nome);
  });

  test('DELETE /autores/:id - não deve retornar nada e apenas mostrar o status', async () => {
    const response = await request(app)
      .delete('/autores/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
    expect(authors.length).toBe(0);
  });
});
