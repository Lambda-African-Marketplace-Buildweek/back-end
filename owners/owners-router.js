const router = require('express').Router();
const Owners = require('./owners-model.js');

const jwt = require('jsonwebtoken');

const restricted = require('../auth/restricted-middleware.js');
const { validItem } = require('./owners-service.js');

// GET all items as it should be viewable by all users
router.get('/', (req, res) => {
  Owners.getAll()
    .then(res => {
      res.status(200).json({ message: 'retrieved all the items' });
    })
    .catch(err => {
      res.status(500).json({ error: 'could not retrieve items' });
    })
})

// POST new item, /addItem
router.post('/addItem', restricted, (req, res) => {
  const data = req.body;

  if(validateItem(data)) {
    Owners.addItem(data)
      .then(res => {
        res.status(201).json({ item: data });
      })
      .catch(err => {
        res.status(500).json({ error: 'could not add item to database' });
      })
  }
})

module.exports = router;