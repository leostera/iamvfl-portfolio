var mongoose = require('mongoose');

console.log('Connecting to MongoDB database...');
mongoose.connect('mongodb://localhost/iamvfl');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Successfully connected to database!');
});