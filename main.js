#! /usr/bin/node

var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');
var router = require('./routes');
var Session = require("./Session");
var mongoose = require("mongoose");
var DB = require("./DB");
var bodyParser = require("body-parser");

var express_app = express();

//set up session handling
express_app.use('/public', express.static(path.join(__dirname, 'public')));
express_app.use(router);

//set up session handling using MongoDB
Session.CreateMemStore(express_app);

//configure templates
nunjucks.configure(path.join(__dirname, './public/templates'), {
  autoescape: true,
  express: express_app
});

//parse JSON and form request bodies
express_app.use(bodyParser.json());
express_app.use(bodyParser.urlencoded({ extended: true }));

DB.Connect().then(function success() {
  express_app.listen(3000, function() {
    console.log('server started');
  });
}, function(error) {
  console.log(error);
}).catch(function (exception) {
  console.log(exception);
});
