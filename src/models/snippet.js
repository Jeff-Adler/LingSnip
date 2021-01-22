const mongoose = require('mongoose')
const isLang = require('./validators')

const snippetSchema = new mongoose.Schema({
    originLang: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!isLang(value)) {
                throw new Error('Language not recognized')
            }
        }
    },
    destinationLang: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!isLang(value)) {
                throw new Error('Language not recognized')
            }
        }
    },
    originPhrase: {
        type: String,
        required: true,
        trim: true
    },
    destinationPhrase: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet