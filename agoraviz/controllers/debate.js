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

    res.redirect('/debates');
  });
});

// Read list of existing debates
router.get('/', (req, res) => {
  getJSON('http://localhost:3000/api/debates', (err, docs) => {
    res.render(
      'pages/debate/debates', {
        title: 'Débats',
        debates: docs,
      },
    );
  });
});

// Delete a debate
router.post('/delete/:id', (req, res) => {
  const id = req.params.id;

  Debate.delete(req.db, id, (err) => {
    if (err) {
      res.send('Error trying to delete a debate')
    }

    res.redirect('/debates');
  });
});


/*
    Show pages
 */

// Show new debate form
router.get('/new', (req, res) => {
  res.render(
    'pages/debate/newDebate', {
      title: 'Nouveau débat',
    },
  );
});

// Show debate
router.get('/show/:id', (req, res) => {
  const id = req.params.id;
  getJSON(`http://localhost:3000/api/debates/${id}`, (err, doc) => {
    res.render(
      'pages/debate/debate', {
        title: doc.question,
        debate: doc,
      },
    );
  });
});



module.exports = router;
