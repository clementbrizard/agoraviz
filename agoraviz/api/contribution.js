const express = require('express');
const Contribution = require('../models/contribution');

const router = express.Router();

// Get all contributions
router.get('/', (req, res) => {
  Contribution.all(req.db, (err, debates) => {
    res.json(debates);
  });
});

module.exports = router;
