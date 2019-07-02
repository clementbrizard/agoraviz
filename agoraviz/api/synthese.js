const express = require('express');
const Synthese = require('../models/synthese');

const router = express.Router();

// Get all syntheses of a given debate
router.get('/:debateId', (req, res) => {
  const debateId = req.params.debateId;
  Synthese.alldebate(req.db, debateId, (err, syntheses) => {
    res.json(syntheses);
  });
});

// Get all syntheses
router.get('/', (req, res) => {
  Synthese.all(req.db, (err, syntheses) => {
    res.json(syntheses);
  });
});



module.exports = router;
