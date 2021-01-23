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

// GET /tasks?limit=(10)&skip=(0)
// GET /tasks?sortBy=createdAt:(asc/desc)
router.get('/snippets', auth, async (req, res) => {
    // sort parameter
    const sort = {}
    
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        // parts[0] = field to sort by
        // parts[1] = asc/desc
        // sets sort value to -1 if query parameter is set to desc, 1 if asc/anything else
        sort[parts[0]] = (parts[1] === 'desc' ? -1 : 1)
    }
    
    try {
        await req.user.populate({
            // path specifies field on User for which we want to get data
            path: 'snippets',
            // specifies matching parameter for path. Shorthand notation for match: {}
            options: {
                //Mongoose knows to ignore this field if it's not passed a number, so default limit will essentially be 0
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                //Shorthand notation for sort : {} using sort variabe from above
                sort
            }
        }).execPopulate()
        res.send(req.user.snippets)
    } catch (e) {
        res.status(500).send()
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