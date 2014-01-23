var grunt = require('grunt'),
    Charlatan = require('charlatan'),

    database = require('../config/database'),
    utils = require('./utils'),

    Page = require('../schema/page').Model,
    User = require('../schema/user').Model,
    Article = require('../schema/article').Model,

    ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

  /**
   * Generates fake page instances
   */
  generatePages: function (count, data) {
    var sample;

    for(var i = 0; i < count; i++) {
      sample = new Page({
        title: Charlatan.Helpers.capitalize(Charlatan.Lorem.words(1).join(' ')),
        content: '<p>' + Charlatan.Lorem.paragraph(20) + '</p>'
      });

      data.push(sample);
    }
  },

  /**
   * Generates fake user instances
   */
  generateUsers: function (count, data) {
    var sample;

    for(var i = 0; i < count; i++) {
      sample = new User({
        username: Charlatan.Internet.userName(),
        password: 'password',
        name: Charlatan.Name.name(),
        email: Charlatan.Internet.email(),
        bio: Charlatan.Lorem.paragraph(5, 25)
      });

      data.push(sample);
    }
  },

  /**
   * Generates fake article instances
   */
  generateArticles: function (count, data) {
    var sample;

    for(var i = 0; i < count; i++) {
      sample = new Article({
        title: Charlatan.Helpers.capitalize(Charlatan.Lorem.words(5).join(' ')),
        content: '<p>' + Charlatan.Lorem.paragraph(20) + '</p>',
        author: new ObjectId()
      });

      data.push(sample);
    }
  },

  /**
   * Populates the database with sample data
   */
  generate: function (done) {
    var sample_data = [],
        async_iterator = 0;

    // Generate the sample data
    this.generatePages(3, sample_data);
    this.generateUsers(10, sample_data);
    this.generateArticles(10, sample_data);

    // Just complete the task if there's nothing to insert
    if(!sample_data.length || sample_data.length === 0)
      done(true);

    // Save each item of the array in the database
    sample_data.forEach(function (item) {
      item.save(function (err, doc) {
        async_iterator++;

        if(err) {
          grunt.log.error(err);

          done(false);
        }
        else {
          grunt.log.ok('Writing object: ' + doc._id);

          // Complete the async task if this is the last item in the array
          if (async_iterator === sample_data.length)
            done(true);
        }
      });
    });
  },

  /**
   * Wipes all data from the database
   */
  delete: function (done) {

    var cb = function (name) {
      return function (err, docs) {
        if(err)
          grunt.log.error(err);
        else
          grunt.log.ok('Successfully erased '+name+'s!');
      }
    };

    // Pages
    Page.remove(cb('page'));

    // Articles
    Article.remove(cb('article'));

    // Users
    User.remove(cb('user'));
  }

};