const mongoose = require('mongoose')

var tokenSchema = new mongoose.Schema({
token: {type: String},
createdAt: {type: Date, default: Date.now},
expires: {type: Number},
usermail: {type: String}
})

module.exports = mongoose.model('Token', tokenSchema)