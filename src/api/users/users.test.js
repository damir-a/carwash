const supertest = require('supertest');
const db = require('../../database/dbconfig');
const app = require('../../app');

describe('GET /api/v1/users', () => {
  it('Should respond with demo user', async () => {
    const responce = await supertest(app)
      .get('/api/v1/users/')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.length).toBeGreaterThan(0);
    expect(responce.body[0].id).toBe(1);
    expect(responce.body[0].deleted_at).toBeNull();
  });
});

describe('GET /api/v1/users/1', () => {
  it('Should respond with demo user 1', async () => {
    const responce = await supertest(app)
      .get('/api/v1/users/1')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.id).toBe(1);
    expect(responce.body.name).toBe('Damir');
  });
});

afterAll(async () => {
  await db.destroy();
});
