var mongoose = require('mongoose');
var Q = require('q');

var user_schema = mongoose.Schema({ 
  username: String,
  password: String,
  user_type: String,
});

var jam_schema = mongoose.Schema({
  Description: String,
  Spots: Array,
  Creator: String
});

module.exports = {
  User: mongoose.model('User', user_schema),
  Jam: mongoose.model('Jam', jam_schema)
}
