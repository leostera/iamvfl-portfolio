var grunt = require('grunt'),
    Charlatan = require('charlatan'),

    database = require('../config/database'),
    utils = require('./utils'),

    Page = require('../models/page'),
    User = require('../models/user'),
    Article = require('../models/article');

module.exports = {

  /**
   * Generates sample pages as dummy data
   */
  generatePages: function (count, data) {
    // Generate pages ages
    for(var i = 0; i < count; i++) {
      data[i] = new Page({
        title: Charlatan.Helpers.capitalize(Charlatan.Lorem.words(1).join(' ')),
        content: '<p>' + Charlatan.Lorem.paragraph(utils.randomInt(5, 25)) + '</p>'
      });
    }
  },

  /**
   * Populates the database with sample data
   */
  generate: function (done) {
    var sample_data = [],
        
        // We'll iterate using this for writing to our database asynchronously
        async_iterator = 0;

    // Generate the sample data
    this.generatePages(5, sample_data);

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
    // Pages
    Page.remove(function (err, docs) {

      if(err) {
        grunt.log.error(err);

        done(false);
      }
      else {
        grunt.log.ok('Successfully erased database!');

        done(true);
      }

    });
  }

};