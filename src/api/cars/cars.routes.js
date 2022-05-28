const express = require('express');
const Cars = require('./cars.model');
const { SQLTime } = require('../../lib/sqltime');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.query().where('deleted_at', null);
    res.send(cars);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Cars.query().where('id', id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const result = await Cars.query().insert(req.body);
    const newCar = {
      ...result,
      status: 200,
      message: 'CAR_CREATED_OK',
    };
    res.send(newCar);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const { id } = req.body;
  const deleted_at = SQLTime();
  try {
    const result = await Cars.query().patch({ deleted_at }).where('id', id);
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
    const result = await Cars.query().patch(newData).where('id', newData.id);
    res.send({
      rowsAffected: result,
      message: {
        text: 'New Car data',
        data: newData,
      },
      id: newData.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
