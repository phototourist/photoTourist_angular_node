/*jshint node:true*/
'use strict';
require('dotenv').load();
var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var http = require('http');
var forceSSL = require('express-force-ssl');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cors = require('cors');
var environment = process.env.NODE_ENV;
var ControllerUsers = require('./users/users.controller');
var multer = require('multer');
var im = require('imagemagick');
var watermark = require('image-watermark');


app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());

var session = require('express-session');
// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
})); // session secret

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);
//require('./camtourist/camtourist.routes')(app);
//require('./contact/contact.routes')(app);
//require('./users/users.routes')(app);

require('./config/routes').routes(app, passport);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

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
        console.log('WARNING: OPEN BROWSER WITH HTTPS');

        app.use(forceSSL); //MODULE USED TO FORCE REDIRECTION
        console.log('WARNING: BE CAREFULL, WE ARE TRYING TO LAUNCH SERVER ON PORT 80.' +
            'CHECK IF ANY OTHER SERVER IS LISTENING ON SAME PORT (APACHE...)' +
            'WE WANT TO FORCE HTTP TO HTTPS REDIRECTION ALWAYS');

        https.createServer({
            key: fs.readFileSync('privkey.pem'),
            cert: fs.readFileSync('fullchain.pem')
        }, app).listen(port);


        http.createServer(app).listen(80);
        //
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
        app.listen(port, function() {
            console.log('Express server listening on port ' + port);
            console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
        });
        break;
}
/*
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});*/