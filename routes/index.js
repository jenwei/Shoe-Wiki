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
  console.log("at home");
  Post.find({}, function(err, posts) {
    if (err) {errorHandler()};
    // console.log(posts);
    res.json(posts);
  });
  };

// routes.pageDisp = function(req, res) {
//   var subj = req.params.subj;
//   // console.log(subj);
//   Post.findOne({"url":subj}, function(err, post) {
//     if (err) {errorHandler()};
//     res.render("pageDisp",{post:post});
//   });
// };

routes.searchDisp = function(req, res) {
  var tags = req.params.tags.split
  console.log(tags);
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
  // var subj = req.params.subj;
  // console.log(subj);
  console.log("making new page called ", req.body.title);
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
  console.log(url);
  Post.findOneAndRemove({"url":url}, function(err, deletedPost) {
    if (err) {errorHandler()};
    Post.find({}, function(err, posts) {
      res.json(posts);
    })
  });
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
