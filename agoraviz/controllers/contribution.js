const express = require('express');
const getJSON = require('get-json');
const Contribution = require('../models/contribution');

const router = express.Router();

/*
  CRUD
 */

// Create a new contribution
router.post('/', (req, res) => {
  const obj = {
    debate: req.body.debate,
    parent: req.body.parent,
    name: req.body.name,
    value: req.body.value
  };

  Contribution.new(req.db, obj, (err) => {
    if (err) {
      res.send('Error when trying to create a contribution');
    }

    res.redirect('back');
  })

})

module.exports = router;
