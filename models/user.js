var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  password_hash: String,
  url: String,
  bio: String,

  meta: {
    hidden: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    modified: Date
  }
});

module.exports = mongoose.model('User', UserSchema);