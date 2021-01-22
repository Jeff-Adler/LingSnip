const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
    originLang: {},
    destinationLang: {},
    originPhrase: {},
    destinationPhrase: {},
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