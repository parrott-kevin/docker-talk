'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/api/status', (req, res) => {
  res.status(200).json({ message: 'Hello There General Kenobi' })
})

app.set('PORT', 9000)
app.listen(app.get('PORT'), () => {
  console.log('Server started on http://localhost:' + app.get('PORT'))
})
