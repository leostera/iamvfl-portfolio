var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
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
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },

  meta: {
    hidden: {
      type: Boolean,
      required: true,
      default: true
    }
  }
});

module.exports = mongoose.model('Article', ArticleSchema);