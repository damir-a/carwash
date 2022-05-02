const express = require('express');
const { SQLTime } = require('../../lib/sqltime');
const Pricelists = require('./pricelists.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Pricelists.query().where('deleted_at', null);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Pricelists.query().where('id', id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const result = await Pricelists.query().insert(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const { id } = req.body;
  const deleted_at = SQLTime();
  try {
    const result = await Pricelists.query()
      .patch({ deleted_at })
      .where('id', id);
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
    const result = await Pricelists.query()
      .patch(newData)
      .where('id', newData.id);
    res.send({
      rowsAffected: result,
      message: {
        text: 'New pricelist data',
        data: newData,
      },
      id: newData.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
