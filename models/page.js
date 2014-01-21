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
    required: true,
    index: { unique: true }
  },
  content: String,

  meta: {
    hidden: {
      type: Boolean,
      required: true,
      default: false
    }
  }
});

/**
 * Converts the title to a slug if it's not already set
 */
PageSchema.pre('save', function (next) {
  if(!this.slug)
    this.slug = utils.slugify(this.title);

  next();
});

module.exports = mongoose.model('Page', PageSchema);