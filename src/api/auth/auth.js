const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.get('*', (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      // res.sendStatus(401);
      res.send({
        token,
        msg: err,
        txt: 'NOT_OK',
      });
    }
  });
  next();
});

router.post('*', (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res.sendStatus(401);
    }
  });
  next();
});

module.exports = router;
