var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

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
  },

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

ArticleSchema.pre('save', function (next) {
  if(!this.slug)
    this.slug = utils.slugify(this.title);

  next();
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = {

  Model: Article,

  /**
   * GET '/articles'
   */
  findAll: function (req, res) {
    var query = Article.find();
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  },

  /**
   * GET '/api/articles/:slug'
   */
  findBySlug: function (req, res) {
    var query = Article.find({ slug: req.params.slug });
    query.exec(function (err, docs) {
      if(err)
        res.json(500, { message: err });
      else
        res.json(200, docs);
    });
  }

};