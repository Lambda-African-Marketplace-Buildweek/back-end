const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const config = require('../api/config.js');

// owners-model here when finished 
const Owners = require('../owners/owners-model.js');
const { isValid } = require('../owners/owners-service');

// POST '/register'
router.post('/register', (req, res) => {
  const credentials = req.body;

  if(isValid(credentials)) {
    // rounds the password is hashed
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hashing password
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;    // password becomiing the value that was hashed

    Owners.add(credentials)
      .then(owner => {
        res.status(201).json({ data: owner });
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not complete registering new user' });
      })
  } else {
    res.status(400).json({ error: 'Please provide a valid username and password' });
  }
})

// POST, '/login'
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(isValid(req.body)) {
    Owners.findBy({ username })
      .then(([user]) => {
        // check the password given to the password registered with for given user
        if(user && bcryptjs.compareSync(password, user.password)) {
          // created a token for the user 
          const token = getJwt(user);

          res.status(200).json({ message: 'welcome to the API!', token });
        } else {
          res.status(401).json({ error: 'invalid credentials' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'could not complete login' });
      })
  } else {
    res.status(400).json({ error: 'please provide a valid username and password' });
  }
})

function getJwt(user) {
  const payload = {
    username: user.username,
  };

  const jwtOptions = {
    expiresIn: '8h',
  };

  return jwt.sign(payload, config.jwtSecret, jwtOptions);
}

module.exports = router;