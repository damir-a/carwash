const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { SQLTime } = require('../../lib/sqltime');
const Pricelists = require('./pricelists.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Pricelists.query();
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
  // const { price_name, service_title, group, price, time_to_wash, client_id } = req.body;
  const newPricelist = {
    ...req.body,
    uuid: uuidv4(),
  };
  try {
    const createdPricelist = await Pricelists.query().insert(newPricelist);
    res.send(createdPricelist);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const { id } = req.body;
  const deleted_at = SQLTime();
  try {
    const deletedPricelist = await Pricelists.query()
      .update({ deleted_at })
      .where('id', id);
    res.send({
      rowsAffected: deletedPricelist,
      message: `deleted_at ${deleted_at}`,
      clientDeleted: id,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  const newPricelistData = req.body;
  try {
    const editedPricelist = await Pricelists.query()
      .update(newPricelistData)
      .where('id', newPricelistData.id);
    res.send({
      rowsAffected: editedPricelist,
      message: `new Pricelist Data ${req.body}`,
      userDeleted: newPricelistData.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
