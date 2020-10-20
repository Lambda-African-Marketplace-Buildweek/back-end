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
        
      })
  }

})

module.exports = router;