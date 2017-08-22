let express = require('express');

//requiring our controller files
let HomeController = require('./controllers/home');
let ProfileController = require('./controllers/profile');


module.exports = function(app){
  //creating router variables
  const homeRouter = express.Router();


  homeRouter.get('/', HomeController.index);
  homeRouter.get('/profile', HomeController.profile);

  // app.use('/static', express.static('public'));
  app.use('/', homeRouter);
}
