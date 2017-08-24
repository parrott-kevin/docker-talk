'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/v1/status', (req, res) => {
  res.status(200).send('up and running')
})

app.set('PORT', 9000)
const server = app.listen(app.get('PORT'), () => {
  console.log('Server started on http://localhost:' + server.address().port)
})
