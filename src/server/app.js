/*jshint node:true*/
'use strict';
require('dotenv').load();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var passport = require('passport');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var flash = require('connect-flash');
var cors = require('cors');
var environment = process.env.NODE_ENV;
var ControllerUsers = require('./users/users.controller');

app.use(cors());

app.use(cookieParser());

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

require('./config/passport')(passport);

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./camtourist/camtourist.routes')(app);
require('./contact/contact.routes')(app);
require('./users/users.routes')(app);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

/*
app.get('/auth/facebook',
   function(req, res, next) {
     var redirect = encodeURIComponent(req.query.redirect || '/');
     passport.authenticate('facebook',{scope: ['email'],
     callbackURL: 'http://localhost:3000/auth/facebook/callback?redirect=' + redirect
       })(req, res, next);
   });

 app.get('/auth/facebook/callback',
   function(req, res, next) {
     var url = 'http://localhost:3000/auth/facebook/callback?redirect=' + encodeURIComponent(req.query.redirect);
     passport.authenticate('facebook', { callbackURL: url })(req, res, next);
   },
   function(req, res) {
     //res.redirect(req.query.redirect);
       console.log(req.user);
       //res.json(req.user.id);
       res.redirect('/signup');
   });
*/

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect : '/successFacebook', failureRedirect : '/404'}));


app.get('/auth/facebook/success', function(req, res) {

        res.json(req.user);

    });



switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});
