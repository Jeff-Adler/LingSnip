const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {},
    email: {},
    password: {},
    name: {},
    age: {},
    nativeLanguages: [],
    otherLanguages: []
}, {
    timestamps: true
})

// Establish ActiveRecord assoication between User and their Tasks

const User = mongoose.model('User', userSchema)

module.exports = User