const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
})

const express = require('express')
const app = express()

const passport = require('passport')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(passport.initialize())

// Authentication strategies
require('./strategies/login')
require('./strategies/register')
require('./strategies/jwt')

require('./routes/base')(app)
require('./routes/auth')(app)
require('./routes/user')(app)
require('./routes/oo')(app)
require('./routes/feedback')(app)

app.use('/docs', express.static('documentation'))

const server = app.listen(process.env.SERVER_PORT, function () {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})

module.exports = {
  app,
  server,
}
