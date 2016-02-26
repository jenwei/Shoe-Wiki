var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title: String,
  body: String,
  timestamp: String,
  author: String,
  imagesource: String,
  tags: Array
})

module.exports = mongoose.model("Post", postSchema);
