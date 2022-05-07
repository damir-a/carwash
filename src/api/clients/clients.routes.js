const express = require('express');
const Clients = require('./clients.model');
const { SQLTime } = require('../../lib/sqltime');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const clients = await Clients.query().where('deleted_at', null);
    res.send(clients);
  } catch (error) {
    next(error);
  }
});

router.get('/info', async (req, res, next) => {
  try {
    const info = await Clients.query()
      .select('c.id', 'c.title', 'c.phone', 'c.reg_date', 'c.GRZ', 'c.isJUR', 'pg.title AS pg_title', 'car.make as car')
      .from('clients AS c')
      .join('price_groups as pg', 'pg.id', '=', 'c.price_id')
      .join('cars as car', 'car.id', '=', 'c.car')
      .where('c.deleted_at', null);
    res.send(info);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Clients.query().where('id', id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const result = await Clients.query().insert(req.body);
    const newClient = {
      ...result,
      status: 200,
      code: 'CLIENT_CREATED_OK',
    };
    res.send(newClient);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const { id } = req.body;
  const deleted_at = SQLTime();
  try {
    const result = await Clients.query().patch({ deleted_at }).where('id', id);
    res.send({
      rowsAffected: result,
      message: `deleted_at ${deleted_at}`,
      id,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  const newData = {
    ...req.body,
    updated_at: SQLTime(),
  };
  try {
    const result = await Clients.query().patch(newData).where('id', newData.id);
    res.send({
      rowsAffected: result,
      message: {
        text: 'New Client data',
        data: newData,
      },
      id: newData.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
