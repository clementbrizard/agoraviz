var express = require('express');
var router = express.Router();

/* GET debatslist. */
router.get('/debatslist', function(req, res) {
  var db = req.db;
  var collection = db.get('debatcollection');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });

});





/* DELETE to deletedebat. */
router.delete('/deletedebat/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('debatcollection');
  var debatToDelete = req.params.id;
  collection.remove({ '_id' : debatToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;
