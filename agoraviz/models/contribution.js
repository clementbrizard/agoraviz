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

// Create a new contribution
exports.new = (db, obj, cb) => {
  db.get('contribcollection').insert({
    debate: ObjectId(obj.debate),
    parent: ObjectId(obj.parent),
    name: obj.name,
    value: obj.value,
  }, {}, (err, docs) => {
    return err ?
      cb(err)
      : cb(null, docs[0]);
  })
};
