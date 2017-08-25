const mongoose = require('mongoose');

//template
const robotSchema = new mongoose.Schema({
  job: {type: String},
  avatar: {type: String},
  name: {type: String, required: true},
  company: {type: String},
  skills: [
    {}
  ],
  email: {type: String},
  phone: {type: String},
  university: {type: String},
  address: {
    city: {type: String},
    country: {type: String},
  },
});

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;
