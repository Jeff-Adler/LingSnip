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

router.get('/snippets/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const snippet = await Snippet.findOne({ _id, owner: req.user._id })

        if (!snippet) {
            return res.status(404).send()
        }

        res.send(snippet)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/snippets/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['originLang', 'destinationLang', 'originPhrase', 'destinationPhrase']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const snippet = await Snippet.findOne({_id: req.params.id, owner: req.user._id})

        if (!snippet) {
            return res.status(404).send()
        }

        updates.forEach((update) => snippet[update] = req.body[update])
        await snippet.save()
        res.send(snippet)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/snippets/:id', auth, async (req, res) => {
    try {
        const snippet = await Snippet.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!snippet) {
            res.status(404).send()
        }

        res.send(snippet)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router