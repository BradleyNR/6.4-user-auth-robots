let Data = require('../models/data');

let HomeController = {
  index: function(req, res){
    res.render('index', {robots: Data.users})
  },
  profile: function(req, res){
    let robotName = req.params.name;
    let targetItem;
    Data.users.forEach((item) => {
    if (item.name == robotName) {
      targetItem = item;
    }
    });
    res.render('profile', {robot: targetItem});
  },
  jobseekers: function(req, res){
    res.render('jobseekers', {robots: Data.users})
  },
  employed: function(req, res){
    res.render('employed', {robots: Data.users})
  }
};

//exporting so we can use this variable in other files we have required this one into
module.exports = HomeController;
