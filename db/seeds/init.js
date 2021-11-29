const { tableNames } = require('../../src/constants/tableNames');
const { cars } = require('../../src/constants/cars');

exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

  const defaultUser = {
    deleted_at: null,
    name: 'Damir',
    password: '123',
    email: 'damir@celion.ru',
    ACL: 1,
  };

  const defaultClient = {
    deleted_at: null,
    title: 'Vasya',
    phone: '',
    price_id: 1,
    GRZ: '777',
    isJUR: false,
  };

  const defaultPricelist = {
    deleted_at: null,
    price_name: '',
    service_title: '',
    group: 1,
    price: 100,
    time_to_wash: 15,
    client_id: 1,
  };

  const defaultServicegroup = {
    title: 'Эконом',
    description: 'Ниссан микра и другие',
  };

  await knex(tableNames.users).insert(defaultUser);
  await knex(tableNames.clients).insert(defaultClient);
  await knex(tableNames.pricelist).insert(defaultPricelist);
  await knex(tableNames.service_groups).insert(defaultServicegroup);

  await Promise.all(
    Object.values(cars).map(
      (car) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        knex(tableNames.cars).insert({
          make: car.en,
          makeRU: car.ru,
          logo: car.logo,
        }),
      // eslint-disable-next-line function-paren-newline
    ),
  );
};
