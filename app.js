// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var taskModel = require("./models/taskSchema.js");
    // configuration =================

    mongoose.connect('_____db link here_____');     // connect to mongoDB database on localhost

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // routes

    app.get('/api/tasks', function(req, res) {
      taskModel.find(function(err, tasks) {
        if (err)
          res.send(err);
        res.json(tasks);
      });
    });

    app.post('/api/tasks', function(req, res) {
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

    app.post('/api/tasks/:task_id', function(req, res) {


    app.delete('/api/tasks/:task_id', function(req, res) {
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

    app.get("*", function(req, res){
      res.sendfile('./Views/main.html')
    })

    // listen (start app with node server.js) ======================================
    app.listen(3000);
    console.log("App listening on port 3000");

// !! Archives !! \\
// // **Used to edit a specified object.**
   //   console.log(req.params);
   //   console.log(req.body.text);
   //   taskModel.update({
   //     _id: req.params.task_id
   //   }, {
   //     text: req.body.text
   //   }, function(err, task) {
   //     if (err) {res.send(err)};
   //     taskModel.find(function(err, tasks) {
   //       if (err) {res.send(err)};
   //       res.json(tasks);
   //     });
   //   });
   // });
