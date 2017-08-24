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

//middles
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//passport setup ***
passport.use(new LocalStrategy(
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

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


//passing app into routes
routes(app);

app.listen(3000);
