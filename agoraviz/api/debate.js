const express = require('express');
const Debate = require('../models/debate');

const router = express.Router();

// Get all debates
router.get('/', (req, res) => {
  Debate.all(req.db, (err, debates) => {
    res.json(debates);
  });
});

// Get one debate
router.get('/:id', (req, res) => {
  Debate.one(req.db, req.params.id, (err, debate) => {
    res.json(debate);
  });
});

// Create a new debate
router.post('/', (req, res) => {
  const obj = {
    question: req.params.question,
  };

  Debate.new(req.db, obj, (err, debate) => {
    res.json(debate);
  });
});

module.exports = router;
