const mongoose = require('mongoose')
const { default: validator } = require('validator')
const isLang = require('./validators')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Weak password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    nativeLanguages: [{
            type: String, 
            trim: true,
            lowercase: true,
            required: true,
            default: 'english',
            validate(value) {
                if (!isLang(value)) {
                    throw new Error('Language not recognized')
                }
            }
    }],
    otherLanguages: [{
            type: String,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!isLang(value)) {
                    throw new Error('Language not recognized')
                }
            }
    }]
}, {
    timestamps: true
})

// Establish ActiveRecord assoication between User and their Tasks

const User = mongoose.model('User', userSchema)

module.exports = User