'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const schema = Schema({
   type: {type: String, require: true},
   author: {type: String, require: true},
   tittle: {type: String, require: true},
   edition: {type: String, require: true},
   description: {type: String, require: true},
   topics: [],
   keyWords: [],
   copies: {type: Number, require: true},
   availables: {type: Number, require: true},
   specimen: {type: Number, require: false},
   currentFrequency : {type: String, require: false}
})

module.exports = mongoose.model("book", schema);