var mongoose = require('mongoose');
var CollectSchema = require('../schemas/collect.js');

var Collect = mongoose.model('Collect',CollectSchema); 
module.exports = Collect;