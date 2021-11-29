const supertest = require('supertest');
const db = require('../../database/dbconfig');
const app = require('../../app');

describe('GET /api/v1/clients', () => {
  it('Should respond with demo client', async () => {
    const responce = await supertest(app)
      .get('/api/v1/clients')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.length).toBeGreaterThan(0);
    expect(responce.body[0].id).toBe(1);
    expect(responce.body[0].deleted_at).toBeNull();
  });
});

describe('GET /api/v1/clients/1', () => {
  it('Should respond with demo client 1', async () => {
    const responce = await supertest(app)
      .get('/api/v1/clients/1')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body[0].id).toBe(1);
    expect(responce.body[0].title).toBe('Vasya');
  });
});

describe('POST /api/v1/clients/new', () => {
  it('Should respond with new client ', async () => {
    const responce = await supertest(app)
      .post('/api/v1/clients/new')
      .send({
        title: 'Vasya',
        price_id: 1,
        car: 1,
        GRZ: '777',
        isJUR: 1,
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.id).toBe(2);
    expect(responce.body.title).toBe('Vasya');
    expect(responce.body.GRZ).toBe('777');
  });
});

describe('DEL /api/v1/clients', () => {
  it('Should delete existing client', async () => {
    const responce = await supertest(app)
      .delete('/api/v1/clients')
      .send({
        id: 1,
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.deleted_at).not.toBeNull();
  });
});

describe('PATCH /api/v1/clients', () => {
  it('Should update existing client', async () => {
    const responce = await supertest(app)
      .patch('/api/v1/clients')
      .send({
        id: 1,
        title: 'SuperClient',
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.rowsAffected).toBe(1);
  });
});

afterAll(async () => {
  await db.destroy();
});
