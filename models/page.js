var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
  title: String,
  url: String,
  content: String,

  meta: {
    hidden: { type: Boolean, default: true },
    created: { type: Date, default: Date.now },
    modified: Date
  }
});

module.exports = mongoose.model('Page', PageSchema);