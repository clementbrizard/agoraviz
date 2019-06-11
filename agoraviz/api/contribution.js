const express = require('express');
const Contribution = require('../models/contribution');

const router = express.Router();

// Get all contributions of a given debate
router.get('/:debateId', (req, res) => {
  const debateId = req.params.debateId;
  Contribution.all(req.db, debateId, (err, contributions) => {
    res.json(contributions);
  });
});

module.exports = router;