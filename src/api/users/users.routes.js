const express = require('express');
const bcrypt = require('bcrypt');
const { SQLTime } = require('../../lib/sqltime');
const Users = require('./users.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Users.query().where('deleted_at', null);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Users.query().where('id', id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  const password = await bcrypt.hash(req.body.password, 12);
  const newUser = {
    ...req.body,
    password,
  };
  try {
    const result = await Users.query().insert(newUser);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const { id } = req.body;
  const deleted_at = SQLTime();
  try {
    const result = await Users.query()
      .patch({
        deleted_at,
      })
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
    const result = await Users.query()
      .patch({ newData })
      .where('id', newData.id);
    res.send({
      rowsAffected: result,
      message: {
        text: 'new user Data',
        data: newData,
      },
      id: newData.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
