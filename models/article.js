var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  url: String,
  content: String,
  author: Schema.Types.ObjectId,

  meta: {
    hidden: { type: Boolean, default: true },
    created: { type: Date, default: Date.now },
    modified: Date
  }
});

module.exports = mongoose.model('Article', ArticleSchema);