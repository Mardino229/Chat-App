const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')

const actorSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    refreshToken: {type: String,default: ""},
})

actorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('actor', actorSchema)






