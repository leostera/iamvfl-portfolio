var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    base = require('./base'),

    utils = require('../helpers/utils');

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    index: { unique: true }
  },
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

ArticleSchema.plugin(base.Schema);

ArticleSchema.pre('save', function (next) {
  if(!this.slug)
    this.slug = utils.slugify(this.title);

  next();
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = base.Model;
module.exports.Model = Article;