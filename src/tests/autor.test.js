const request = require('supertest');
const app = require('../app');
const { Autor } = require('../../models');

beforeEach(async () => {
  await Autor.destroy({ where: {} }); // Limpar tabela antes de cada teste
  await Autor.create({ id: 1, nome: 'Autor 1', pais: 'Pais 1' });
});

describe('Autor API', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'password' });
    token = response.body.token;
  });

  test('GET /autores - deve retornar todos os autores', async () => {
    const response = await request(app)
      .get('/autores')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('POST /autores - deve criar e retornar um novo autor', async () => {
    const novoAutor = { nome: 'Autor 2', pais: 'Pais 2' };
    const response = await request(app)
      .post('/autores')
      .set('Authorization', `Bearer ${token}`)
      .send(novoAutor);
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe(novoAutor.nome);

    const autores = await Autor.findAll();
    expect(autores.length).toBe(2);
  });

  test('PUT /autores/:id - deve atualizar e retornar o autor atualizado', async () => {
    const autorAtualizado = { nome: 'Autor Atualizado 1', pais: 'Pais Atualizado 1' };
    const response = await request(app)
      .put('/autores/1')
      .set('Authorization', `Bearer ${token}`)
      .send(autorAtualizado);
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe(autorAtualizado.nome);

    const autor = await Autor.findByPk(1);
    expect(autor.nome).toBe(autorAtualizado.nome);
  });

  test('DELETE /autores/:id - deve deletar o autor e retornar no content', async () => {
    const response = await request(app)
      .delete('/autores/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);

    const autores = await Autor.findAll();
    expect(autores.length).toBe(0);
  });
});
