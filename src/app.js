const express = require('express')
require('./db/mongoose')

const app = express()

//built-in express middleware to parse requests as JSON
app.use(express.json())

module.exports = app