'use strict';

var express = require('express'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),

    database = require('./config/database');

// Application object
var app = express(),
    routes = require('./config/routes').dispatch(app);

// Configuration
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('dark-bonobo-father'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// Development environment config
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});