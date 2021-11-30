const supertest = require('supertest');
const db = require('../../database/dbconfig');
const app = require('../../app');

describe('GET /api/v1/acl', () => {
  it('Should respond with demo ACL', async () => {
    const responce = await supertest(app)
      .get('/api/v1/acl')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.length).toBeGreaterThan(0);
    expect(responce.body[0].id).toBe(1);
    expect(responce.body[0].deleted_at).toBeNull();
  });
});

describe('GET /api/v1/acl/1', () => {
  it('Should respond with demo acl 1', async () => {
    const responce = await supertest(app)
      .get('/api/v1/acl/1')
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body[0].id).toBe(1);
    expect(responce.body[0].title).toBe('Default');
  });
});

describe('POST /api/v1/acl/new', () => {
  it('Should respond with new ACL ', async () => {
    const responce = await supertest(app)
      .post('/api/v1/acl/new')
      .send({
        title: 'Default',
        read: 1,
        write: 1,
        admin: 1,
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.id).toBe(2);
    expect(responce.body.title).toBe('Default');
    expect(responce.body.read).toBe(1);
    expect(responce.body.write).toBe(1);
    expect(responce.body.admin).toBe(1);
  });
});

describe('DEL /api/v1/acl', () => {
  it('Should delete existing ACL', async () => {
    const responce = await supertest(app)
      .delete('/api/v1/acl')
      .send({
        id: 1,
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.deleted_at).not.toBeNull();
  });
});

describe('PATCH /api/v1/acl', () => {
  it('Should update existing ACL', async () => {
    const responce = await supertest(app)
      .patch('/api/v1/acl')
      .send({
        id: 1,
        title: 'Super',
        admin: 1,
      })
      .expect('Content-type', /json/)
      .expect(200);

    expect(responce.body.rowsAffected).toBe(1);
    expect(responce.body.message.data.admin).toBe(1);
  });
});

afterAll(async () => {
  await db.destroy();
});
