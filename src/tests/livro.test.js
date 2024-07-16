const request = require('supertest');
const app = require('../app');
const livros = require('../models/livro');

beforeEach(() => {
  livros.length = 0;
  livros.push({ id: 1, isbn: '111', titulo: 'Livro 1', autores: ['Autor 1'], editora: 'Editora 1', ano: 2021, disponivel: true });
});

describe('API de Livros', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
    .post('/login')
    .send({ username: 'user', password: 'password' });
    token = response.body.token;
  });

  test('GET /livros - deve retornar todos os livros', async () => {
    const response = await request(app)
      .get('/livros')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('POST /livros - deve criar um novo livro', async () => {
    const novoLivro = { isbn: '222', titulo: 'Livro 2', autores: ['Autor 2'], editora: 'Editora 2', ano: 2022, disponivel: true };
    const response = await request(app)
      .post('/livros')
      .set('Authorization', `Bearer ${token}`)
      .send(novoLivro);
    expect(response.status).toBe(201);
    expect(response.body.titulo).toBe(novoLivro.titulo);
    expect(livros.length).toBe(2);
  });

  test('PUT /livros/:id - deve atualizar um livro', async () => {
    const livroAtualizado = { titulo: 'Livro Atualizado 1', editora: 'Editora Atualizada 1' };
    const response = await request(app)
      .put('/livros/1')
      .set('Authorization', `Bearer ${token}`)
      .send(livroAtualizado);
    expect(response.status).toBe(200);
    expect(response.body.titulo).toBe(livroAtualizado.titulo);
  });

  test('DELETE /livros/:id - deve deletar um livro', async () => {
    const response = await request(app)
      .delete('/livros/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
    expect(livros.length).toBe(0);
  });
});
