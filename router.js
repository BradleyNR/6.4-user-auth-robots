let express = require('express');

//requiring our controller files
let HomeController = require('./controllers/home');


module.exports = function(app){
  //creating router variables
  const homeRouter = express.Router();


  homeRouter.get('/', HomeController.index);
  homeRouter.get('/profile/:name', HomeController.profile);
  homeRouter.get('/jobseekers', HomeController.jobseekers);
  homeRouter.get('/employed', HomeController.employed);

  app.use('/', homeRouter);
}
