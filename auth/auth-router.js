const router = require('express').Router();

require('dotenv').config();
const Users = require('./auth-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(({ id }) => {
      res.status(201).json({ status: 201, message: id });
    })
    .catch(error => {
      res.status(500).json({ error: error, message: 'registration failed' });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // sign in token
        const token = signToken(user);
        //send the token
        res.status(200).json({
          token,
          message: `Get Loose ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Unable to Login User", error });
    });
});

function signToken(user) {
  const payload = {
    // header payload and verify signature
    // payload -> username, id, roles, exp date
    username: user.username,
    subject: user.id,
    // role: user.role,
  }
  const secret = process.env.SECRET || "this is my secret, i like ketchup on my eggs.";
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, secret, options)
}

module.exports = router;
