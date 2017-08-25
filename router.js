let express = require('express');
let passport = require('passport')
//requiring our controller files
let HomeController = require('./controllers/home');
//Auth
let UserController = require('./controllers/user');

const requireLogin = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};




module.exports = function(app){
  //creating router variables
  const homeRouter = express.Router();
  //Auth
  const userRouter = express.Router();

  homeRouter.use(requireLogin);
  homeRouter.get('/', HomeController.index);
  homeRouter.get('/profile/:name', HomeController.profile);
  homeRouter.get('/jobseekers', HomeController.jobseekers);
  homeRouter.get('/employed', HomeController.employed);

  //authentification routes
  userRouter.get('/login', UserController.login);
  userRouter.get('/signup', UserController.signup);
  userRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));
  userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login/',
    failureFlash: true
  }));


  app.use('/', userRouter);
  app.use('/', homeRouter);
}
