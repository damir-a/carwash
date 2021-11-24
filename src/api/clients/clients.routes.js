const express = require('express');
const Clients = require('./clients.model');
const { SQLTime } = require('../../lib/sqltime');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const clients = await Clients.query();
    res.send(clients);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Clients.query().where('id', id);
    res.send(client[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const newClient = await Clients.query().insert(req.body);
    res.send(newClient);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const { id } = req.body;
  const deleted_at = SQLTime();
  try {
    const deletedClient = await Clients.query()
      .update({ deleted_at })
      .where('id', id);
    res.send({
      rowsAffected: deletedClient,
      message: `deleted_at ${deleted_at}`,
      clientDeleted: id,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  const newClientData = {
    ...req.body,
    updated_at: SQLTime(),
  };
  try {
    const updatedClient = await Clients.query()
      .update(newClientData)
      .where('id', newClientData.id);
    res.send({
      rowsAffected: updatedClient,
      message: 'Client Data updated',
      updatedClient: newClientData.id,
      updated_at: newClientData.updated_at,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
