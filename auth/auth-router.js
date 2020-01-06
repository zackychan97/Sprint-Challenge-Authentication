const router = require('express').Router();

// require('dotenv').config();
const Users = require('./auth-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// router.post('/register', (req, res) => {
//   let user = req.body;
//   const hash = bcrypt.hashSync(user.password, 10);
//   user.password = hash;

//   Users.add(user)
//     .then(({ id }) => {
//       res.status(201).json({ status: 201, message: id });
//     })
//     .catch(error => {
//       res.status(500).json({ error: error, message: 'registration failed' });
//     });
// });

router.post('/register', (req, res) => {
  const body = req.body;
  if (!body.username || !body.password) {
    res.status(400).json({ message: "need username and pw" })
  } else {
    const hashedPw = bcrypt.hashSync(body.password, 8);

    Users.add({ username: body.username, password: hashedPw })
      .then(newestUser => {
        res.status(201).json(newestUser);
      })
      .catch(err => {
        console.log("Error", err);
        res.status(500).json({ message: "Error saving user to db" })
      })
  }
})



// router.post('/login', (req, res) => {
//   let { username, password } = req.body;

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         // sign in token
//         const token = signToken(user);
//         //send the token
//         res.status(200).json({
//           token,
//           message: `Get Loose ${user.username}!`,
//         });
//       } else {
//         res.status(401).json({ message: 'Invalid Credentials' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ error: "Unable to Login User", error });
//     });
// });

router.post('/login', (req, res) => {
  const body = req.body;
  if (!body.username || !body.password) {
    res.status(400).json({ message: "need username and pw" });
  } else {
    Users.getByName(body.username)
      .then(dbUser => {
        if (dbUser && bcrypt.compareSync(body.password, dbUser.password)) {
          const token = generateToken(dbUser);
          res.status(200).json({ message: "Here is your token your majesty", token })
        } else {
          res.status(401).json({ message: "You shall not pass!" })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error in the server" })
      })
  }
})


// function signToken(user) {
//   const payload = {
//     // header payload and verify signature
//     // payload -> username, id, roles, exp date
//     username: user.username,
//     subject: user.id,
//     // role: user.role,
//   }
//   const secret = process.env.SECRET || "this is my secret, i sleep eyes wide open.";
//   const options = {
//     expiresIn: '1h',
//   };
//   return jwt.sign(payload, secret, options)
// }

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "8h"
  }
  return jwt.sign(payload, "this is my secret", options )
}

module.exports = router;