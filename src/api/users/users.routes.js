const express = require('express');
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

module.exports = router;
