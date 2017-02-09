/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors'); //cal per a signin fb
var errorHandler = require('./routes/utils/errorHandler')();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7200;
var routes;
var environment = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());            // Compress response data with gzip
app.use(logger('dev'));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(cors());                 //cal per a signin fb
app.use(errorHandler.init);

routes = require('./routes/index')(app);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

var source = '';

//////////// SIGNIN FB //////////////////
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'yomogantestfacebookjohnpapa',
}));
app.use(passport.initialize());
app.use(passport.session());

/*
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/ping',
            failureRedirect : '/ping'
        }));

app.get('/ping', function(req, res, next) {
    console.log(req.user);
    res.send(req.user);
});
*/

 app.get('/auth/facebook',
    function(req, res, next) {
      var redirect = encodeURIComponent(req.query.redirect || '/');
      passport.authenticate('facebook',{scope: ['email'],
      callbackURL: 'https://nodejs-angular2-yomogan.c9users.i/auth/facebook/callback?redirect=' + redirect
        })(req, res, next);
    });

  app.get('/auth/facebook/callback',
    function(req, res, next) {
      var url = 'https://nodejs-angular2-yomogan.c9users.io/auth/facebook/callback?redirect=' + encodeURIComponent(req.query.redirect);
      passport.authenticate('facebook', { callbackURL: url })(req, res, next);
    },
    function(req, res) {
      //res.redirect(req.query.redirect);
        console.log(req.user);
        res.send(req.user);
    });

/////////////// END SIGNIN FB ///////////////

switch (environment){
    case 'production':
        console.log('** PRODUCTION ON AZURE **');
        console.log('serving from ' + './build/');
        process.chdir('./../../');
        app.use('/', express.static('./build/'));
        break;
    case 'stage':
    case 'build':
        console.log('** BUILD **');
        console.log('serving from ' + './build/');
        app.use('/', express.static('./build/'));
        break;
    default:
        console.log('** DEV **');
        console.log('serving from ' + './src/client/ and ./');
        app.use('/', express.static('./src/client/'));
        app.use('/', express.static('./'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});
