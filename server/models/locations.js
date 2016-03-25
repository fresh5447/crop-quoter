var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  locationKey: {type: String, unique: true},
  wheat: Array,
  barley: Array,
  cty: {type: String, unique: true},
  twp: {type: String, unique: true},
  rge: {type: String, unique: true},
});

module.exports = mongoose.model('Location', LocationSchema);