const express = require('express');

const router = express.Router();

router.use('/debates', require('./debate'));

router.get('/', (req, res) => {
  res.render('index', {
    title: 'AgoraViz',
  });
});

module.exports = router;
