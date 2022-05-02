const express = require('express');
const bcrypt = require('bcrypt');
const yup = require('yup');
const Users = require('../users/users.model');
const { sign, check } = require('../auth/jwt');

const router = express.Router();

const validateSchema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  email: yup.string().email().trim().required(),
  password: yup
    .string()
    .trim()
    .min(8)
    .max(255)
    .matches(/[^a-zA-Z0-9]/, 'password must contain special chars')
    .matches('[A-Z]', 'passsword must contain uppercase chars')
    .matches('[a-z]', 'passsword must contain lowercase chars')
    .matches('[0-9]', 'passsword must contain numbers')
    .required(),
});

router.post('/register', async (req, res, next) => {
  const newUser = {
    ...req.body,
  };
  try {
    await validateSchema.validate(newUser, {
      abortEarly: false,
    });

    const exitingUser = await Users.query()
      .where({ email: newUser.email })
      .first();
    if (exitingUser) {
      const err = new Error(
        `User with email ${exitingUser.email} already exists`,
      );
      next(err);
      throw err;
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 12);
    newUser.password = hashedPassword;
    const insertedUser = await Users.query().insert(newUser);
    const payload = {
      id: insertedUser.id,
      name: insertedUser.name,
      email: insertedUser.email,
    };
    const token = await sign(payload);
    res.send({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) next('No credentials');
  // console.log('body >>>', email, password);
  try {
    const user = await Users.query().where({ email }).first();
    if (!user) {
      next(new Error(JSON.stringify({
        message: 'Very bad credentials',
        status: 401,
      })));
    }
    // console.log('user >>>', user);
    // const hashedPassword = bcrypt.hash(password, 12);
    const isValidPassword = await bcrypt.compare(password, user.password);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    if (isValidPassword) {
      const token = await sign(payload);
      res.send({
        user: payload,
        token,
      });
    } else {
      next(new Error(JSON.stringify({
        message: 'Very bad credentials',
        status: 401,
      })));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/check_token', async (req, res) => {
  const { token } = req.body;
  try {
    await check(token);
    res.send(JSON.stringify({
      message: 'TOKEN_CHECK_OK',
      status: 200,
      token
    }));
  } catch (error) {
    // next(error);
    res.send(JSON.stringify({
      messgae: 'BAD_TOKEN',
      status: 401,
      token
    }));
  }
});

module.exports = router;
