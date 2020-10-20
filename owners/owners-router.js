const router = require('express').Router();
const Owners = require('./owners-model.js');

const restricted = require('../auth/restricted-middleware.js');
const { validItem } = require('./owners-service.js');

// POST new item 
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