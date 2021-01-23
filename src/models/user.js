const mongoose = require('mongoose')
const { default: validator } = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const isLang = require('./validators')
const Snippet = require('./snippet')

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
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, 
{
    timestamps: true
})

// Establish ActiveRecord assoication between User and their Snippets
userSchema.virtual('snippets', {
    ref: 'Snippet',
    localField: '_id',
    foreignField: 'owner'
})

// Serializer that removes password and tokens for all routes that send back user data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()  

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    //No user is found with given email
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    //User with given email is found, but given password does not match found user's password
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
//Hash plain text password on user creation/update
userSchema.pre('save', async function (next) {
    const user = this

    // isModified ensures that password is not hashed on update of another field
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8)

    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Snippet.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User