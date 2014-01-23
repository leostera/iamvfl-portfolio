/*
 * Module Dependencies
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,


/*
 * Expose the Module
 */

module.exports = {};

/*
 * Base Schema
 */

module.exports.Schema = new Schema({
  meta: {
    hidden: {
      type: Boolean,
      required: true,
      default: true
    },
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

/*
 * Base Model with helper functions
 */

module.exports.Model = {
  /**
   * GET '/api/:model'
   */
  findAll: function (req, res) {
    var query = this.Model.find();
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  },

  /**
   * GET '/api/:model/:slug'
   */
  findBySlug: function (req, res) {
    var query = this.Model.find({ slug: req.params.slug });
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  }
}