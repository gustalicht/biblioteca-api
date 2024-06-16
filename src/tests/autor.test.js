const request = require('supertest');
const app = require('../src/app');
const authors = require('../src/models/author');

beforeEach(() => {
  authors.length = 0;
  authors.push({ id: 1, name: 'Author 1', country: 'Country 1' });
});

describe('Author API', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app).post('/login');
    token = response.body.token;
  });

  test('GET /authors - should return all authors', async () => {
    const response = await request(app)
      .get('/authors')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('POST /authors - should create a new author', async () => {
    const newAuthor = { name: 'Author 2', country: 'Country 2' };
    const response = await request(app)
      .post('/authors')
      .set('Authorization', `Bearer ${token}`)
      .send(newAuthor);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newAuthor.name);
    expect(authors.length).toBe(2);
  });

  test('PUT /authors/:id - should update an author', async () => {
    const updatedAuthor = { name: 'Updated Author 1', country: 'Updated Country 1' };
    const response = await request(app)
      .put('/authors/1')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedAuthor);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedAuthor.name);
  });

  test('DELETE /authors/:id - should delete an author', async () => {
    const response = await request(app)
      .delete('/authors/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
    expect(authors.length).toBe(0);
  });
});
