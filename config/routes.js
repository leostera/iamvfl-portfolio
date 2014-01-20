var siteController = require('../controllers/site'),
    userController = require('../controllers/user'),
    blogController = require('../controllers/blog');

exports.dispatch = function (app) {

  // Pages
  app.get( '/', siteController.index );

  // API
  // app.get( '/api/users', userController.index );
  // app.get( '/api/users/:id', userController.findById );

  // app.get( '/api/blog', blogController.index );
  // app.get( '/api/blog/:id', blogController.findById );

};