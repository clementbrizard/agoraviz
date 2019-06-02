const express = require('express');
const getJSON = require('get-json');
const Debate = require('../models/debate');

const router = express.Router();

/*
    CRUD
 */

// Create a new debate
router.post('/', (req, res) => {
  const obj = {
    question: req.body.question,
  };

  Debate.new(req.db, obj, (err) => {
    if (err) {
      res.send('Error when trying to create a debate');
    }

    res.redirect('/');
  });
});


/*
    Get pages
 */

// Get new debate form
router.get('/new', (req, res) => {
  res.render(
    'pages/debate/newDebate', {
      title: 'Lancer un nouveau débat',
    },
  );
});

// Get list of existing debates
router.get('/', (req, res) => {
  getJSON('http://localhost:3000/api/debates', (err, docs) => {
    res.render(
      'pages/debate/debates', {
        debates: docs,
      },
    );
  });
});

module.exports = router;
