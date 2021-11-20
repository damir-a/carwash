const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Users = require('./users.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await Users.query();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Users.query().where('id', id);
    res.send(data[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const uuid = uuidv4();
    const newUser = {
      name,
      email,
      password,
      uuid,
    };
    const createdUser = await Users.query().insert(newUser);
    res.send(createdUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.body;
    const deleted_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const deleted = await Users.query()
      .update({
        deleted_at,
      })
      .where('id', id);
    res.send({
      rowsAffected: deleted,
      message: `deleted_at ${deleted_at}`,
      userDeleted: id,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { id, name, email, password, ACL } = req.body;
    const userUpdated = await Users.query()
      // eslint-disable-next-line object-curly-newline
      .update({ name, email, password, ACL })
      .where('id', id);
    res.send({
      rowsAffected: userUpdated,
      message: `new User Data ${req.body}`,
      userDeleted: id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
