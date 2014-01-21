var Page = require('../models/page');

module.exports = {

  // GET '/'
  index: function (req, res) {
    res.render('index', { title: 'Home' });
  },

  // GET '/all'
  getAllPages: function (req, res) {
    var query = Page.find();
    query.exec(function (err, docs) {
      res.json(200, docs);
    });
  },

  // GET '/:pageURL'
  getPageBySlug: function (req, res) {
    var query = Page.find({ slug: req.params.slug });
    query.exec(function (err, docs) {
      res.json(200, docs);
    });
  }

};