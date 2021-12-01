const supertest = require('supertest');
const db = require('../../database/dbconfig');
const app = require('../../app');

describe('GET /api/v1/orders', () => {
  it('Should respond with demo order', async () => {
    const responce = await supertest(app)
      .get('/api/v1/orders')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.length).toBeGreaterThan(0);
    expect(responce.body[0].id).toBe(1);
    expect(responce.body[0].deleted_at).toBeNull();
  });
});

describe('GET /api/v1/orders/1', () => {
  it('Should respond with demo order 1', async () => {
    const responce = await supertest(app)
      .get('/api/v1/orders/1')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body[0].id).toBe(1);
  });
});

describe('POST /api/v1/orders/new', () => {
  it('Should respond with new order ', async () => {
    const responce = await supertest(app)
      .post('/api/v1/orders/new')
      .send({
        client_id: 1,
        order_id: 1,
        service_id: 1,
        user_id: 1,
        car_id: 1,
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.id).toBe(2);
  });
});

describe('DEL /api/v1/orders', () => {
  it('Should delete existing order', async () => {
    const responce = await supertest(app)
      .delete('/api/v1/orders')
      .send({
        id: 1,
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.deleted_at).not.toBeNull();
  });
});

describe('PATCH /api/v1/orders', () => {
  it('Should update existing order', async () => {
    const responce = await supertest(app)
      .patch('/api/v1/orders')
      .send({
        id: 1,
        order_id: 100,
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.rowsAffected).toBe(1);
    expect(responce.body.message.data.order_id).toBe(100);
  });
});

afterAll(async () => {
  await db.destroy();
});
