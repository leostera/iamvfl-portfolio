var mongoose = require('mongoose');

console.log('Connecting to MongoDB database...');
mongoose.connect('mongodb://localhost/iamvfl');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Successfully connected to database!');
});

/**
 * Populates the database with some sample data
 */
exports.populate = function (callback) {
  var e = null;

  // You can insert Model objects in your sample data.
  // e.g. sample_data = [ new User({ name: 'John', age: '25' }) ]
  var sample_data = [];

  for(var i = 0; i < sample_data.length; i++) {
    sample_data[i].save(function (error, queryResponse) {
      if(error)
        e = error;
    });
  }

  callback(e);
};

/**
 * Wipes all data from the database
 */
exports.erase = function (callback) {
  var e = null;

  Map.remove(function (error, queryResponse) {
    if(error)
      e = error;
  });

  callback(e);
};