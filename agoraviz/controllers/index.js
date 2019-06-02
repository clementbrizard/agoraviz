const express = require('express');

const router = express.Router();

router.use('/debates', require('./debate'));

// Home page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'AgoraViz',
  });
});

// About page
router.get('/about', (req, res) => {
  res.render(
    'pages/about', {
      title: 'À propos',
    },
  );
});

module.exports = router;
