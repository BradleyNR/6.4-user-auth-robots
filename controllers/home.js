let Data = require('../models/data');

let HomeController = {
  index: function(req, res){
    res.render('index', {robots: Data.users})
  },
  profile: function(req, res){
    res.send('Hello Profile!');
  }
};

//exporting so we can use this variable in other files we have required this one into
module.exports = HomeController;
