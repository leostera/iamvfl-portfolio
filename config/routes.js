var siteController = require('../controllers/site'),
    userController = require('../controllers/user'),
    articleController = require('../controllers/article');

exports.dispatch = function (app) {

  // API
  // Pages
  app.get( '/api/pages', siteController.findAll );
  app.get( '/api/pages/:slug', siteController.findBySlug );

  app.get( '/api/users', userController.findAll );
  app.get( '/api/users/:slug', userController.findBySlug );

  // app.get( '/api/articles', articleController.index );
  // app.get( '/api/articles/:id', articleController.findById );

};