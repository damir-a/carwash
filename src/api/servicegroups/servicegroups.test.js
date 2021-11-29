const supertest = require('supertest');
const db = require('../../database/dbconfig');
const app = require('../../app');

describe('GET /api/v1/servicegroups', () => {
  it('Should respond with all servicegroups', async () => {
    const responce = await supertest(app)
      .get('/api/v1/servicegroups')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.length).toBeGreaterThan(0);
  });
});

describe('Get /api/v1/servicegroups/1', () => {
  it('Should return one servicegroup', async () => {
    const responce = await supertest(app)
      .get('/api/v1/servicegroups/1')
      .expect('Content-type', /json/)
      .expect(200);
    expect(responce.body.length).toBeGreaterThan(0);
  });
});

describe('POST /api/v1/servicegroups/new', () => {
  it('Should put new servicegroup', async () => {
    const responce = await supertest(app)
      .post('/api/v1/servicegroups/new')
      .send({
        title: 'Test servicegroup',
        description: 'test description',
      })
      .expect('Content-type', /json/)
      .expect(200);
    expect(responce.body).not.toBeNull();
    expect(responce.body.id).toBeGreaterThan(1);
    expect(responce.body.title).toBe('Test servicegroup');
  });
});

describe('Put /api/v1/servicegroups', () => {
  it('Should edit servicegroup', async () => {
    const responce = await supertest(app)
      .patch('/api/v1/servicegroups')
      .send({
        id: 1,
        title: 'Test title 2',
      })
      .expect('Content-type', /json/)
      .expect(200);
    expect(responce.body.length).not.toBeNull();
    expect(responce.body.id).toBe(1);
    expect(responce.body.message.data.title).toBe('Test title 2');
  });
});

afterAll(async () => {
  await db.destroy();
});
