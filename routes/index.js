/*
    index.js as a router which allows app.js to perform different
functions based on the get/post requests that it receives.
*/


var mongoose = require('mongoose');
var Post = require('../models/postSchema.js');
var routes = {};

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('err',{error: err})
}

routes.home = function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {errorHandler()};
    res.render("home", {posts: posts});
  });
};

routes.pageDisp = function(req, res) {
  var subj = req.params.subj;
  console.log(subj);
  Post.findOne({"url":subj}, function(err, post) {
    if (err) {errorHandler()};
    res.render("pageDisp",{post:post});
  });
};

routes.delDisp = function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {errorHandler()};
    console.log(posts);
    res.render("delDisp", {posts: posts});
  });
};

routes.searchDisp = function(req, res) {
  var tags = req.params.tags.split
  console.log(tags);
  Post.find({"tags": {$all: tags}}, function(err, resultPosts) {
    res.render("searchDisp", resultPosts);
  });
};

routes.pageEdit = function(req, res) {
  var subj = req.params.subj;
  console.log(subj);
  console.log(req.body.title);
  Post.update({url:subj},{
    body:req.body.body,
    title:req.body.title,
    author:req.body.author,
    tags: req.body.tags,
    imagesource: req.body.imagesource
  }, function(err, updatedPost) {
    if (err) {errorHandler()};
    res.json(updatedPost);
  });
};

routes.pageNew = function(req, res) {
  var subj = req.params.subj;
  console.log(subj);
  console.log(req.body.title);
  Post.create({
    url: subj,
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
  var subj = req.params.subj;
  Post.findOneandRemove({'url':subj}, function(err, delPost) {
    if (err) {errorHandler()};
    res.status(200).end();
  })
};


module.exports = routes;

/*

!! Archives !!
 **Used to edit a specified object.**
     console.log(req.params);
     console.log(req.body.text);
     taskModel.update({
       _id: req.params.task_id
     }, {
       text: req.body.text
     }, function(err, task) {
       if (err) {res.send(err)};
       taskModel.find(function(err, tasks) {
         if (err) {res.send(err)};
         res.json(tasks);
       });
     });
   });

**Also used to edit a specific object using an ID.**
   taskModel.update({
     _id: req.params.task_id
   }, {
     completed: true
   }, function(err, task) {
     if (err) {res.send(err)};
     taskModel.find(function(err, tasks) {
       if (err) {res.send(err)};
       res.json(tasks);
     });
   });
 });

**Create a new document**
 console.log("this", req.body);
 taskModel.create({
     text : req.body.text,
     completed : false
 }, function(err, todo) {
     if (err)
         res.send(err);
     taskModel.find(function(err, tasks) {
         if (err)
             res.send(err);
         res.json(tasks);
     });
 });
 // res.end(".")
});

**Find all documents**
taskModel.find(function(err, tasks) {
  if (err)
    res.send(err);
  res.json(tasks);
});
});

*/
