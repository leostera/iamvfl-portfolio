var dbHelper = require('./helpers/database');

module.exports = function (grunt) {

  /**
   * db:generate
   */
  grunt.registerTask('db:generate', 'Generates sample data for the application.', function () {
    var done = this.async();

    dbHelper.generate(done);
  });

  /**
   * db:delete
   */
  grunt.registerTask('db:delete', 'Erases all data from the application.', function () {
    var done = this.async();

    dbHelper.delete(done);
  });

};