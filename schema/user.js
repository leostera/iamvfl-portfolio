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

/**
 * Slugifies the username if a slug isn't already set and generates password hash
 * before saving to the database
 */
UserSchema.pre('save', function (next) {
  if(!this.slug)
    this.slug = utils.slugify(this.username);
  else
    this.slug = utils.slugify(this.slug); // Enforce rules eve if it's populated

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
      return next();
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
    
    return callback(null, matches);
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
        return res.json(500, { message: err });
      
      return res.json(200, docs);
    });
  },

  /**
   * POST '/api/users'
   */
  new: function (req, res) {
    var doc = new User(req.body);

    doc.save(function (err, doc) {
      if(err)
        return res.json(500, { message: err });
      
      return res.json(200, doc);
    });
  },

  /**
   * GET '/api/users/:slug'
   */
  findBySlug: function (req, res) {
    var query = User.find({ slug: req.params.slug });

    query.exec(function (err, docs) {
      if(err)
        return res.json(500, { message: err });

      return res.json(200, docs);
    });
  },

  /**
   * UPDATE '/api/users/:slug'
   */
  update: function (req, res) {
    var query = User.update({ slug: req.params.slug }, 
               { $set: req.body, $inc: { count: 1 } }, 
               { multi: false });

    query.exec(function (err, doc) {
      if(err)
        return res.json(500, { message: err });

      return res.json(200, doc);
    });
  },

  /**
   * DELETE '/api/users/:slug'
   */
  remove: function (req, res) {
    var query = User.remove({ slug: req.params.slug });
    query.exec(function (err, doc) {
      if(err)
        return res.json(500, { message: err });

      // HTTP 204 is the code for no content
      return res.json(204);
    });
  }

};