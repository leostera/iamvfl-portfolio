var Page = require('../schema/page'),
    User = require('../schema/user'),
    Article = require('../schema/article');

exports.dispatch = function (app) {

  // Pages
  app.get( '/api/pages', Page.findAll );
  app.get( '/api/pages/:slug', Page.findBySlug );

  // Users
  app.get( '/api/users', User.findAll );
  app.get( '/api/users/:slug', User.findBySlug );

  // Articles
  app.get( '/api/articles', Article.findAll );
  app.get( '/api/articles/:slug', Article.findBySlug );

};