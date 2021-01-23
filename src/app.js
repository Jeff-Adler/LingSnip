const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const snippetRouter = require('./routers/snippet')

const app = express()

//built-in express middleware to parse requests as JSON
app.use(express.json())
app.use(userRouter)
app.use(snippetRouter) 

module.exports = app