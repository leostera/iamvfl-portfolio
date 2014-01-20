var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    index: { unique: true }
  },
  content: String,

  meta: {
    hidden: {
      type: Boolean,
      required: true,
      default: true
    }
  }
});

module.exports = mongoose.model('Page', PageSchema);