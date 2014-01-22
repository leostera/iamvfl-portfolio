var Page = require('../models/page');

module.exports = {

  // GET '/api/pages'
  findAll: function (req, res) {
    var query = Page.find();
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  },

  // GET '/api/pages/:slug'
  findBySlug: function (req, res) {
    var query = Page.find({ slug: req.params.slug });
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  }

};