var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title: String,
  url: String,
  body: String,
  timestamp: Date,
  author: String,
  imagesource: String, // did images end up happening? completely ok if not! but good to go back and clean up
  tags: Array
})

module.exports = mongoose.model("Post", postSchema);
