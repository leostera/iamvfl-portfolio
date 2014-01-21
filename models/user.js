var bcrypt = require('bcrypt'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  bio: String,

  meta: {
    created: {
      type: Date,
      required: true,
      default: Date.now,
    },
    modified: {
      type: Date,
      required: true,
      default: Date.now,
    }
  }
});

/**
 * Converts the username to a slug if it's not already set
 */
UserSchema.pre('save', function (next) {
  if(!this.slug)
    this.slug = utils.slugify(this.username);

  next();
});

module.exports = mongoose.model('User', UserSchema);