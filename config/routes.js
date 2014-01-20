var siteController = require('../controllers/site'),
    userController = require('../controllers/user'),
    articleController = require('../controllers/article');

exports.dispatch = function (app) {

  // Pages
  app.get( '/', siteController.index );
  app.get( '/:pageURL', siteController.findPageByURL);

  // API
  // app.get( '/api/users', userController.index );
  // app.get( '/api/users/:id', userController.findById );

  // app.get( '/api/articles', articleController.index );
  // app.get( '/api/articles/:id', articleController.findById );

};