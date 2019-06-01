var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'AgoraViz' });
});

/* GET New Débat page. */
router.get('/newdebat', function(req, res) {
    res.render('pages/newdebat', { title: 'Lancer un nouveau débat' });
});

router.get('/debatslist', function(req, res) {
    var db = req.db;
    var collection = db.get('debatcollection');
    collection.find({},{},function(e,docs){
        res.render('pages/debatslist', {
            "debatslist" : docs,
            title: 'AgoraViz'
        });
    });
});

// about page
router.get('/about', function(req, res) {
    res.render('pages/about', { title: 'AgoraViz' });
});





module.exports = router;
