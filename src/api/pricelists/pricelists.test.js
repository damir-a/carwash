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

afterAll(async () => {
  await db.destroy();
});
