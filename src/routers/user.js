const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    console.log("TEST")

    const user = new User(req.body)

    try {
        await user.save()
        // const token = {}
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router