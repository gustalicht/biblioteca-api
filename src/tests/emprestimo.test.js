const request = require('supertest');
const app = require('../app');
const emprestimos = require('../models/emprestimo');
const livros = require('../models/livro');
const clientes = require('../models/cliente');

beforeEach(() => {
  emprestimos.length = 0;
  livros.length = 0;
  clientes.length = 0;
  
  livros.push({ id: 1, isbn: '111', titulo: 'Livro 1', autores: ['Autor 1'], editora: 'Editora 1', ano: 2021, disponivel: true });
  clientes.push({ id: 1, matricula: '123', nome: 'Cliente 1', telefone: '123456789' });
});

describe('API de Empréstimos', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
    .post('/login')
    .send({ username: 'user', password: 'password' });
    token = response.body.token;
  });

  test('GET /emprestimos - deve retornar todos os empréstimos', async () => {
    const response = await request(app)
      .get('/emprestimos')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test('POST /emprestimos- deve criar um novo empréstimo', async () => {
    const novoEmprestimo = { clientId: 1, bookId: 1 };
    const response = await request(app)
      .post('/emprestimos')
      .set('Authorization', `Bearer ${token}`)
      .send(novoEmprestimo);
    expect(response.status).toBe(201);
    expect(response.body.clientId).toBe(novoEmprestimo.clientId);
    expect(emprestimos.length).toBe(1);
  });

  test('POST /emprestimos/:id/return - deve retornar um livro', async () => {
    const novoEmprestimo = { clientId: 1, bookId: 1 };
    await request(app)
      .post('/emprestimos')
      .set('Authorization', `Bearer ${token}`)
      .send(novoEmprestimo);

    const response = await request(app)
      .post('/emprestimos/1/return')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.emprestimo.returned).toBe(true);
    expect(livros.find(b => b.id === 1).disponivel).toBe(true);
  });

  test('POST /emprestimos- deve retornar erro ao criar empréstimo com cliente inexistente', async () => {
    const novoEmprestimo = { clientId: 2, bookId: 1 };
    const response = await request(app)
      .post('/emprestimos')
      .set('Authorization', `Bearer ${token}`)
      .send(novoEmprestimo);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Cliente não encontrado');
  });

  test('POST /emprestimos- deve retornar erro ao criar empréstimo com livro indisponível', async () => {
    livros[0].disponivel = false;
    const novoEmprestimo = { clientId: 1, bookId: 1 };
    const response = await request(app)
      .post('/emprestimos')
      .set('Authorization', `Bearer ${token}`)
      .send(novoEmprestimo);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Livro não encontrado ou não disponível');
  });

  test('POST /emprestimos- deve retornar erro se o cliente já tem 3 empréstimos ativos', async () => {
    emprestimos.push({ id: 1, clientId: 1, bookId: 2, dateTaken: new Date(), dateDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), returned: false });
    emprestimos.push({ id: 2, clientId: 1, bookId: 3, dateTaken: new Date(), dateDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), returned: false });
    emprestimos.push({ id: 3, clientId: 1, bookId: 4, dateTaken: new Date(), dateDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), returned: false });

    const novoEmprestimo = { clientId: 1, bookId: 1 };
    const response = await request(app)
      .post('/emprestimos')
      .set('Authorization', `Bearer ${token}`)
      .send(novoEmprestimo);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Cliente já possui 3 empréstimos ativos');
  });
});
