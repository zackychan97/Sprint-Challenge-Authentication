const router = require('express').Router();

const bcrypt = require('bcryptjs');

const signToken = require('../JWT/signToken'); // get signtoken

const userDb = require('../models/userDb');


router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
