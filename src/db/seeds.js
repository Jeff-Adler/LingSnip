require('./mongoose')
const faker = require('faker');

const User = require('../models/user')
const Snippet = require('../models/snippet')

const times = (repetitions, callback) => {
    while (repetitions > 0) {
        callback()
        repetitions--
    }
  }

// seed users
// times(1 , async () => {
    // const userObj = {
    //     name: "Jeff",
    //     email: "Jeff.Test@gmail.com",
    //     password: "Blx4352!aDG",
    //     age: 43,
    // }
//     const user = new User(userObj)
//     try {
//         await user.save()
//         console.log(user)
//     } catch (e) {
//         console.log("Could not save Post seed. ", e)
//     }
// })

// seed snippets
