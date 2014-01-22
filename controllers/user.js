var User = require('../models/user');

module.exports = {

  // GET '/api/users'
  findAll: function (req, res) {
    var query = User.find();
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  },

  // GET '/api/users/:slug'
  findBySlug: function (req, res) {
    var query = User.findOne({ slug: req.params.slug });
    query.exec(function (err, doc) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, doc);
    })
  }

};