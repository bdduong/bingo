const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/ball', (req, res) => {
  res.json({number: Math.floor(Math.random() * 100) + 1});
});

app.post('/api/verification', (req, res) => {
  const drawn = req.body.drawn;
  const submitted = [].concat.apply([], req.body.submitted);
  let result = true;
  for (let num of submitted) {
    if (!drawn[num]) {
      result = false;
    }
  }
  res.json({result})
});

app.listen(9000, () => console.log('BINGO API listening on port 9000!'))