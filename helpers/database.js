var database = require('../config/database');

/**
 * Populates the database with sample data
 */
exports.sample = function () {
  // You can insert Model objects in your sample data.
  // e.g.
  // sample_data = [ new User({ name: 'John', age: '25' }) ]
  var sample_data = [];

  for(var i = 0; i < sample_data.length; i++) {
    sample_data[i].save(function (error, queryResponse) {
      if(error)
        e = error;
    });
  }

  console.log('database is now populated with sample data!');
};

/**
 * Wipes all data from the database
 */
exports.erase = function () {
  // e.g.
  // User.remove(function (error, queryResponse) {
  //   if(error)
  //     e = error;
  // });
  
  console.log('successfully erased database!');
};