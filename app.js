const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./router');

//passport dependencies ***
const User = require('./models/user');
const bcrype = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      session = require('express-session'),
      flash = require('express-flash-messages');

//absolute path for css
const path = require('path');

const app = express();
//absolute path
app.use('/static', express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//heroku database setup
var database = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(database);

//passport setup ***
passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
      User.authenticate(username, password, function(err, user) {
          if (err) {
              return done(err)
          }
          if (user) {
              return done(null, user)
          } else {
              return done(null, false, {
                  message: "There is no user with that username and password."
              })
          }
      })
  }));


passport.use('local-signup', new LocalStrategy(
  function(username, password, done){
    User.signup(username, password, function(err, usr){
      if (err) {
          return done(err)
      }
      if (user) {
          return done(null, user)
      } else {
          return done(null, false, {
              message: "There is already a user with that username."
          });
      }
    });
  }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//passing app into routes
routes(app);

app.listen(process.env.PORT || 3000);
