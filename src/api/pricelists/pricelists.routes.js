const express = require('express');
const Pricelists = require('./pricelists.model');
// const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await Pricelists.query();
  try {
    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
