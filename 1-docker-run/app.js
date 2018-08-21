const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/status', (req, res) => {
  res.status(200).send('up and running');
})

app.set('PORT', 9000);
app.listen(app.get('PORT'), () => {
  console.log('Server started on http://localhost:' + app.get('PORT'));
})
