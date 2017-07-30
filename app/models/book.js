var mongoose = require('mongoose');
var BookSchema = require('../schemas/book.js');

var Book = mongoose.model('Book',BookSchema)

module.exports = Book