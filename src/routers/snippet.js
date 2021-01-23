const express = require('express')
const Snippet = require('../models/snippet')
const auth = require('../middleware/auth')
const router = new express.Router()



module.exports = router