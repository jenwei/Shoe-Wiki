// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var taskModel = require("./models/postSchema.js");
    var privdata = require("./config.js"); // config file with db info (used .gitignore so it wouldn't be)
    var routes = require("./routes/index.js");
    var exphbs = require('express-handlebars');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');


    // configuration =================
    mongoose.connect(privdata.mongodburl);     // connect to mongoDB database on localhost
    // mongoose.connect('mongodb://localhost/test');


    // app.engine('handlebars', exphbs ({defaultLayout: 'main', extname: '.handlebars'}));
    // app.set('view engine', 'handlebars');
    // app.set('views', path.join(__dirname, '/views'));

    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // // routes =========================
    app.get('/api/posts', routes.home);  // List of all shoe articles and search bar

    // clientside app.get('/api/pages/:subj', routes.pageDisp);  // :task_id // A specific shoe article specified by the url after pages/

    // clientside app.get('/api/pages/del', routes.delDisp);  // A page listing posts and an option to delete them

    // clientside app.get('/api/search/:tags', routes.searchDisp);  // A list of shoe articles that have a specific tag or tags

    app.post('/api/pages/edit/:subj', routes.pageEdit);  // A post request that edits the page specified

    app.post('/api/pages/new', routes.pageNew);  // A post request that creates a new article

    app.post('/api/pages/del', routes.pageDel);  // A post request that deletes an article

    // listen (start app with node server.js) ======================================
    app.listen(process.env.PORT || 3000);
    console.log("App listening on port 3000");
