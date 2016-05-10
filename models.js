var mongoose = require('mongoose');
var Q = require('q');

var user_schema = mongoose.Schema({ 
  username: String,
  password: String,
  user_type: String,
});

var jam_schema = mongoose.Schema({
  Title: String,
  Date: Date,
  Description: String,
  Location: String,
  Spots: Array,
  Creator: String,
  Comments: String
});

module.exports = {
  User: mongoose.model('User', user_schema),
  Jam: mongoose.model('Jam', jam_schema)
}
