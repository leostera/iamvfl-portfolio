// Dependencies
var database = require('../config/database'),
    utils = require('./utils'),
    Charlatan = require('charlatan'),

    Page = require('../models/page'),
    User = require('../models/user'),
    Article = require('../models/article');

module.exports = {
  /**
   * Populates the database with sample data
   */
  sample: function () {
    var sample_data = [],

        page_count = 5,
        user_count = 10,
        article_count = 10;

    // Pages
    for(var i = 0; i < page_count; i++) {
      sample_data[i] = new Page({
        title: Charlatan.Lorem.words(utils.randomInt(1, 6)),
        content: Charlatan.Lorem.paragraphs(utils.randomInt(1, 6))
      });
    }

    // Save to the database
    for(var i = 0; i < sample_data.length; i++) {
      sample_data[i].save(function (err, res) {
        if(err)
          console.log(err);
      });
    }

    console.log('database is now populated with sample data!');
  },

  /**
   * Wipes all data from the database
   */
  erase: function () {
    // Pages
    Page.remove(function (err, res) {
      if(err)
        console.log(err);
    });
    
    console.log('successfully erased database!');
  }
}