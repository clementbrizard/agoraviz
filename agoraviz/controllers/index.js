const express = require('express');

const router = express.Router();

router.use('/debates', require('./debate'));
router.use('/contributions', require('./contribution'));
router.use('/syntheses', require('./synthese'));

// Home page
router.get('/', (req, res) => {
  res.redirect('/debates');
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
