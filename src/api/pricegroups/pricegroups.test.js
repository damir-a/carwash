const supertest = require('supertest');
const db = require('../../database/dbconfig');
const app = require('../../app');

describe('GET /api/v1/pricegroups', () => {
  it('Should respond with demo price_group', async () => {
    const responce = await supertest(app)
      .get('/api/v1/pricegroups')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.length).toBeGreaterThan(0);
    expect(responce.body[0].id).toBe(1);
    expect(responce.body[0].deleted_at).toBeNull();
  });
});

describe('GET /api/v1/pricegroups/1', () => {
  it('Should respond with demo order 1', async () => {
    const responce = await supertest(app)
      .get('/api/v1/pricegroups/1')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body[0].id).toBe(1);
  });
});

describe('POST /api/v1/pricegroups/new', () => {
  it('Should respond with new order ', async () => {
    const responce = await supertest(app)
      .post('/api/v1/pricegroups/new')
      .send({
        title: 'price_group from test',
        description: 'price_group_description from test'
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.id).toBeGreaterThan(1);
  });
});

describe('DEL /api/v1/pricegroups', () => {
  it('Should delete existing order', async () => {
    const responce = await supertest(app)
      .delete('/api/v1/pricegroups')
      .send({
        id: 1,
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.deleted_at).not.toBeNull();
  });
});

describe('PATCH /api/v1/pricegroups', () => {
  it('Should update existing order', async () => {
    const responce = await supertest(app)
      .patch('/api/v1/pricegroups')
      .send({
        id: 1,
        title: 'new title'
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.rowsAffected).toBe(1);
    expect(responce.body.message.data.title).toBe('new title');
  });
});

afterAll(async () => {
  await db.destroy();
});
