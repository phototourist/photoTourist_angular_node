const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const OAuthStrategy = require('passport-oauth').OAuthStrategy; //encara que no es gaste, fa falta
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy; //encara que no es gaste, fa falta

passport.serializeUser( function( user, cb ) {
    cb( null, user );
} );
passport.deserializeUser( function( obj, cb ) {
    cb( null, obj );
} );

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: '1250655768361117',
  clientSecret: 'cdef86dee33660343397aa880ea86799',
  callbackURL: '/auth/facebook/callback',
  //callbackURL: 'https://nodejs-angular2-yomogan.c9users.io/auth/facebook/callback'
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, cb) => {
  //console.log(profile);
  req.user = profile.name;
  console.log(req.user);
  return cb( null, profile);
  //return done({ msg: `yomogan` });
}));
