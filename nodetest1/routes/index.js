var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/debatslist', function(req, res) {
    var db = req.db;
    var collection = db.get('debatcollection');
    collection.find({},{},function(e,docs){
        res.render('debatslist', {
            "debatslist" : docs
        });
    });
});

/* GET New Débat page. */
router.get('/newdebat', function(req, res) {
    res.render('newdebat', { title: 'Lancer un nouveau débat' });
});

/* POST to Add Debat Service */
router.post('/adddebat', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var debatQuestion = req.body.question;

    // Set our collection
    var collection = db.get('debatcollection');

    // Submit to the DB
    collection.insert({
        "question" : debatQuestion
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("debatslist");
        }
    });

});

module.exports = router;
