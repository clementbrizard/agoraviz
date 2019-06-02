// Get all contributions
exports.all = (db, cb) => {
  db.get('contribcollection').find({}, {}, (err, docs) => {
    return err ?
      cb(err)
      : cb(null, docs);
  });
};
