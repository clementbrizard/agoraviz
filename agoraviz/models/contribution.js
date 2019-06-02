const ObjectId = require('mongodb').ObjectID;

// Get all contributions of a given debate
exports.all = (db, debate, cb) => {
  const debateId = debate;
  db.get('contribcollection').find({
    debate: ObjectId(debateId),
  }, {}, (err, docs) => {
    return err ?
      cb(err)
      : cb(null, docs);
  });
};
