const request = require('supertest');
const app = require('../app');
const { Loan, Cliente, Livro } = require('../../models');

beforeEach(async () => {
  await Loan.destroy({ where: {} });
  await Cliente.destroy({ where: {} });
  await Livro.destroy({ where: {} });

  await Cliente.create({ id: 1, matricula: '1234', nome: 'Cliente 1', telefone: '555-1234' });
  await Livro.create({ id: 1, isbn: '123456789', titulo: 'Livro 1', autores: 'Autor 1', editora: 'Editora 1', ano: 2020, disponivel: true });
  await Loan.create({ id: 1, clientId: 1, bookId: 1, loanDate: new Date(), returnDate: new Date(), returned: false });
});

describe('Loan API', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'password' });
    token = response.body.token;
  });

  test('GET /loans - should return all loans', async () => {
    const response = await request(app)
      .get('/loans')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('POST /loans - should create and return a new loan', async () => {
    const newLoan = { clientId: 1, bookId: 2, loanDate: new Date(), returnDate: new Date(), returned: false };
    await Livro.create({ id: 2, isbn: '987654321', titulo: 'Livro 2', autores: 'Autor 2', editora: 'Editora 2', ano: 2021, disponivel: true });
    const response = await request(app)
      .post('/loans')
      .set('Authorization', `Bearer ${token}`)
      .send(newLoan);
    expect(response.status).toBe(201);
    expect(response.body.clientId).toBe(newLoan.clientId);

    const loans = await Loan.findAll();
    expect(loans.length).toBe(2);
  });

  test('PUT /loans/:id - should update and return the updated loan', async () => {
    const updatedLoan = { clientId: 1, bookId: 1, loanDate: new Date(), returnDate: new Date(), returned: true };
    const response = await request(app)
      .put('/loans/1')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedLoan);
    expect(response.status).toBe(200);
    expect(response.body.returned).toBe(updatedLoan.returned);

    const loan = await Loan.findByPk(1);
    expect(loan.returned).toBe(updatedLoan.returned);
  });

  test('DELETE /loans/:id - should delete the loan and return no content', async () => {
    const response = await request(app)
      .delete('/loans/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);

    const loans = await Loan.findAll();
    expect(loans.length).toBe(0);
  });
});
