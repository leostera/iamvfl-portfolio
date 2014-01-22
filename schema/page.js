var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    utils = require('../helpers/utils');

var PageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    index: { unique: true }
  },
  content: String,

  meta: {
    hidden: {
      type: Boolean,
      required: true,
      default: false
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

PageSchema.pre('save', function (next) {
  if(!this.slug)
    this.slug = utils.slugify(this.title);

  next();
});

// The mongoose object performing operations on the database
var Page = module.exports = mongoose.model('Page', PageSchema);

module.exports = {

  Model: Page,

  /**
   * GET '/api/pages'
   */
  findAll: function (req, res) {
    var query = Page.find();
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  },

  /**
   * GET '/api/pages/:slug'
   */
  findBySlug: function (req, res) {
    var query = Page.find({ slug: req.params.slug });
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  }

};