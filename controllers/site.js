var Page = require('../models/page');

module.exports = {

  // GET '/'
  index: function (req, res) {
    res.render('index', { title: 'Home' });
  },

  // GET '/:pageURL'
  getPageByURL: function (req, res) {
    res.render('index', { title: 'Page' });
  }

};