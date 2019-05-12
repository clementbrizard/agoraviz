var express = require('express');
var router = express.Router();

/* GET debatslist. */
router.get('/debatslist', function(req, res) {
  var db = req.db;
  var collection = db.get('debatcollection');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });

  
  collection.find({},{},function(e,docs){
        res.render('debatslist', {
            "debatslist" : docs
        });
    });
});

module.exports = router;
