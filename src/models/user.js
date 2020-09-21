'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = Schema({
    email: { type: String, require: true },
    carnet_cui: { type: String, require: true },
    user_name: { type: String, require: true },
    user_lastName: { type: String, require: true },
    password: { type: String, require: true },
    rol: { type: String, require: true }
})

module.exports = mongoose.model("user", schema);