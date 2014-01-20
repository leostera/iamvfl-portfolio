var dbHelper = require('./helpers/database');

module.exports = function (grunt) {

  grunt.registerTask('db:sample', 'Generates sample data for the application.', function () {
    dbHelper.sample();
  });

  grunt.registerTask('db:erase', 'Erases all data from the application.', function () {
    dbHelper.erase();
  });

};