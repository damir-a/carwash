const { tableNames } = require('../../src/constants/tableNames');

exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

  const defaultUser = {
    deleted_at: null,
    uuid: '70b48524-9c5b-4d99-a881-7c7590b053b4',
    name: 'Damir',
    password: '123',
    email: 'damir@celion.ru',
    ACL: 1,
  };

  await knex(tableNames.users).insert(defaultUser);
};
