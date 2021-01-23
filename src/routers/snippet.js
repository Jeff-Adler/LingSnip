const express = require('express')
const Snippet = require('../models/snippet')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/snippets', auth, async (req, res) => {
    const snippet = new Snippet({
        ...req.body, 
        owner: req.user._id
    })

    try {
        await snippet.save()
        res.status(201).send(snippet)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router