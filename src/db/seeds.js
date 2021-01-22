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
times(20 , async () => {
    // const post = new Post({
    //     text: faker.lorem.sentence()
    // })
    // try {
    //     await post.save()
    //     console.log(post)
    // } catch (e) {
    //     console.log("Could not save Post seed. ", e)
    // }
})

// seed snippets
