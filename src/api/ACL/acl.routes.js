const express = require('express');
const ACL = require('./acl.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await ACL.query();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
