const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { SQLTime } = require('../../lib/sqltime');
const Servicegroups = require('./servicegroups.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Servicegroups.query();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Servicegroups.query().where('id', id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const createdServicegroup = await Servicegroups.query().insert({
      ...req.body,
    });
    res.send(createdServicegroup);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const { id } = req.body;
  const deleted_at = SQLTime();
  try {
    const deletedServiceGroup = await Servicegroups.query()
      .patch({ deleted_at })
      .where('id', id);
    res.send({
      rowsAffected: deletedServiceGroup,
      message: `deleted_at ${deleted_at}`,
      id: req.body.id,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  const newServiceGroup = req.body;
  try {
    const editedServiceGroup = await Servicegroups.query()
      .patch(newServiceGroup)
      .where('id', newServiceGroup.id);
    res.send({
      rowsAffected: editedServiceGroup,
      message: {
        text: 'New servicegroup data',
        data: newServiceGroup,
      },
      id: newServiceGroup.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
