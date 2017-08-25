const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//newline
// TODO: add data fields from robots.js in models to this, so they can go back and update it later
// TODO: check against the username (since it's unique) to see what they can access
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, required: true },
  passwordHash: { type: String, required: true },
  //added from robot model
  job: {type: String},
  avatar: {type: String},
  name: {type: String},
  company: {type: String},
  skills: [{}],
  email: {type: String},
  phone: {type: String},
  university: {type: String},
  address: {
    state: {type: String},
    city: {type: String},
    country: {type: String},
  },
});


userSchema.virtual('password')
  .get(function () { return null })
  .set(function (value) {
    const hash = bcrypt.hashSync(value, 8);
    this.passwordHash = hash;
  })

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false)
        } else if (user && user.authenticate(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
};

userSchema.statics.signup = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
          done(err, false);
        } else if (user){
          done(null, false);
        } else {
          var newUser = new User({username: username, password: password});
          newUser.save(function(err, user){
            if (err) {
              done(err, false);
            } else{
              done(null, user);
            }
          });
        }
    });
};


const User = mongoose.model('Robot', userSchema);
module.exports = User;
