const express = require('express');
const db = require('../database/dbconfig');

const router = express.Router();

router.get('/get', async (req, res) => {
  const data = await db.select('name').from('knex_migrations');
  res.send(data[0]);
});

module.exports = router;
