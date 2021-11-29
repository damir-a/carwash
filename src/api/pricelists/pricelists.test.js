const supertest = require('supertest');
const db = require('../../database/dbconfig');
const app = require('../../app');

describe('GET /api/v1/pricelists', () => {
  it('Should respond with all pricelists', async () => {
    const responce = await supertest(app)
      .get('/api/v1/pricelists')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.length).toBeGreaterThan(0);
  });
});

describe('Get /api/v1/pricelists/1', () => {
  it('Should return one pricelist', async () => {
    const responce = await supertest(app)
      .get('/api/v1/pricelists/1')
      .expect('Content-type', /json/)
      .expect(200);
    expect(responce.body.length).toBeGreaterThan(0);
  });
});

describe('POST /api/v1/pricelists/new', () => {
  it('Should put new pricelist', async () => {
    const responce = await supertest(app)
      .post('/api/v1/pricelists/new')
      .send({
        price_name: 'Test price',
        service_title: 'Test title',
        group: 1,
        price: 100,
        time_to_wash: 30,
        client_id: 1,
      })
      .expect('Content-type', /json/)
      .expect(200);
    expect(responce.body).not.toBeNull();
    expect(responce.body.id).toBeGreaterThan(1);
    expect(responce.body.service_title).toBe('Test title');
  });
});

describe('Put /api/v1/pricelists', () => {
  it('Should edit pricelist', async () => {
    const responce = await supertest(app)
      .patch('/api/v1/pricelists')
      .send({
        id: 1,
        price_name: 'Test price 2',
      })
      .expect('Content-type', /json/)
      .expect(200);
    expect(responce.body.length).not.toBeNull();
    expect(responce.body.id).toBe(1);
    expect(responce.body.message.data.price_name).toBe('Test price 2');
  });
});

afterAll(async () => {
  await db.destroy();
});
