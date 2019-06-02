// Get all debates
exports.all = (db, cb) => {
  db.get('debatcollection').find({}, {}, (err, docs) => {
    if (err) return cb(err);
    return cb(null, docs);
  });
};

// Get one debate
exports.one = (db, id, cb) => {
  db.get('debatcollection').find({
    _id: id,
  }, {}, (err, docs) => {
    return err ?
      cb(err)
      : cb(null, docs[0]);
  });
};

// Create a new debate
exports.new = (db, obj, cb) => {
  db.get('debatcollection').insert({
    question: obj.question,
  }, {}, (err, doc) => {
    return err ?
      cb(err)
      : cb(null, doc);
  });
};

// Delete a debate
exports.delete = (db, id, cb) => {
  db.get('debatcollection').remove({
    _id: id,
  }, {}, (err) => {
    return err ?
      cb(err)
      : cb(null);
  });
};
