var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    base = require('./base'),
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

PageSchema.plugin(base.Schema);

PageSchema.pre('save', function (next) {
  if(!this.slug)
    this.slug = utils.slugify(this.title);

  next();
});

// The mongoose object performing operations on the database
var Page = module.exports = mongoose.model('Page', PageSchema);

module.exports = require('./base');
exports.Model = Page;