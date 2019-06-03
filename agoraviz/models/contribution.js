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
    type: obj.type,
    name: obj.name,
    value: obj.value,
    auteur: obj.auteur,
    timestamp: obj.timestamp
  }, {}, (err, docs) => {
    return err ?
      cb(err)
      : cb(null, docs[0]);
  })
};
