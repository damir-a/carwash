const { v4: uuidv4 } = require('uuid');
const { tableNames } = require('../../src/constants/tableNames');
const { cars } = require('../../src/constants/cars');

exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

  const defaultUser = {
    deleted_at: null,
    uuid: uuidv4(),
    name: 'Damir',
    password: '123',
    email: 'damir@celion.ru',
    ACL: 1,
  };

  const defaultClient = {
    deleted_at: null,
    uuid: uuidv4(),
    title: 'Vasya',
    phone: '',
    price_id: 1,
    GRZ: '777',
    isJUR: false,
  };

  await knex(tableNames.users).insert(defaultUser);
  await knex(tableNames.clients).insert(defaultClient);

  await Promise.all(
    Object.values(cars).map(
      (car) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        knex(tableNames.cars).insert({
          uuid: uuidv4(),
          make: car.en,
          makeRU: car.ru,
          logo: car.logo,
        }),
      // eslint-disable-next-line function-paren-newline
    ),
  );
};
