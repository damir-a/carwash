const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.get('*', (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.send(401);
    } else {
      res.send(decoded);
    }
  });
  next();
});

router.post('*', (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.send(401);
    } else {
      res.send(decoded);
    }
  });
  next();
});

module.exports = router;
