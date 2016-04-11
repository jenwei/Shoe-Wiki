/*
index.js is a router which allows app.js to perform different
functions based on the get/post requests that it receives.

The functionalities we've implemented include displaying all posts, searching (via title or tag),
page editing, page creation, and page deletion.
*/

// you don't actually need mongoose in this file -- the variable "mongoose" never shows up. The model is enough
var Post = require('../models/postSchema.js');
var routes = {};

function errorHandler(err, req, res, next) { // nice abstraction :)
  res.status(500);
  res.render('err',{error: err})
}

routes.home = function(req, res) {
  // clean up debugging mechanisms before pushing!
  Post.find({}, function(err, posts) {
    if (err) {errorHandler(err, req, res)}; // error handler takes params, yes? (throughout)
    res.json(posts);
  });
};

// clean up dead code & old comments before pushing!

routes.searchDisp = function(req, res) { // I tend not to use "nicknames" for variables -- e.g. here I have to stop and think about what "disp" means
  var tags = req.params.tags.split
  Post.find({"tags": {$all: tags}}, function(err, resultPosts) {
    res.render("searchDisp", resultPosts);
  });
};

routes.pageEdit = function(req, res) {
  Post.update({url:req.body.url},{
    body:req.body.body,
    title:req.body.title,
    author:req.body.author,
    tags: req.body.tags,
    imagesource: req.body.imagesource,
    timestamp: Date()
  }, function(err, numAffected) {
    if (err) {errorHandler()};
    Post.findOne({url:req.body.url}, function(err, updatedPost) {
      if (err) {errorHandler()};
      res.json(updatedPost);
    })
  }
  )
};

routes.pageNew = function(req, res) {
  Post.create({
    url: req.body.url,
    timestamp: Date(),
    body:req.body.body,
    title:req.body.title,
    author:req.body.author,
    tags: req.body.tags,
    imagesource: req.body.imagesource
  }, function(err, newPost) {
    if (err) {errorHandler()};
    res.json(newPost);
  });
};

routes.pageDel = function(req, res) {
  var url = req.params.url;
  Post.findOneAndRemove({"url":url}, function(err, deletedPost) {
    if (err) {errorHandler()};
    Post.find({}, function(err, posts) {
      res.json(posts);
    })
  });
};

module.exports = routes;
