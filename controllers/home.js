// let Data = require('../models/data');
let Robot = require('../models/robots');


let HomeController = {
  index: function(req, res){
    //when pulling from database, need .find
    Robot.find().then(function(robot){
      res.render('index', {robot: robot});
    });
  },
  profile: function(req, res){
    let robotName = req.params.name;
    Robot.findOne({name: robotName}).then(function(robot){
      res.render('profile', {robot: robot});
    });
  },
  jobseekers: function(req, res){
    Robot.find().then(function(robot){
      res.render('jobseekers', {robot: robot});
    });
  },
  employed: function(req, res){
    Robot.find().then(function(robot){
      res.render('employed', {robot: robot});
    });
  }
};


// let HomeController = {
//   index: function(req, res){
//     res.render('index', {robots: Data.users})
//   },
//   profile: function(req, res){
//     let robotName = req.params.name;
//     let targetItem;
//     Data.users.forEach((item) => {
//     if (item.name == robotName) {
//       targetItem = item;
//     }
//     });
//     res.render('profile', {robot: targetItem});
//   },
//   jobseekers: function(req, res){
//     res.render('jobseekers', {robots: Data.users})
//   },
//   employed: function(req, res){
//     res.render('employed', {robots: Data.users})
//   }
// };

//exporting so we can use this variable in other files we have required this one into
module.exports = HomeController;
