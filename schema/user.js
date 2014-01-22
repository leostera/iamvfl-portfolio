var bcrypt = require('bcrypt'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    utils = require('../helpers/utils');

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
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    index: { unique: true }
  },
  photo: String,
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

UserSchema.pre('save', function (next) {
  if(!this.slug)
    this.slug = utils.slugify(this.username);

  if(!this.isModified('password'))
    return next();

  // Generate the password hash
  bcrypt.genSalt(10, function (err, salt) {
    if(err)
      return next(err)

    // Hash with the new salt
    bcrypt.hash(this.password, salt, function (err, hash) {
      if(err)
        return next(err);

      this.password = hash;
      next();
    }.bind(this));
  }.bind(this));
});

/**
 * Compares the plaintext password against the stored hash
 */
UserSchema.methods.comparePassword = function (candidate, callback) {
  bcrypt.compare(candidate, this.password, function (err, matches) {
    if(err)
      return callback(err);
    else
      callback(null, matches);
  });
};

// The mongoose object performing operations on the database
var User = mongoose.model('User', UserSchema);

module.exports = {

  Model: User,

  /**
   * GET '/api/users'
   */
  findAll: function (req, res) {
    var query = User.find();
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  },

  /**
   * GET '/api/users/:slug'
   */
  findBySlug: function (req, res) {
    var query = User.find({ slug: req.params.slug });
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  }

};