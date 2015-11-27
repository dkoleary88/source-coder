// external dependencies
var express = require('express');
var bodyParser = require('body-parser');

// internal dependencies
var source = require('./source');
var parse = require('./parse');

// instantiate express server
var app = express();

// parse request body as json
app.use(bodyParser.json());

// server static files from client directory
app.use(express.static('../client'));

// handle post request on source endpoint - from client
app.post('/source',
  function (req, res) {
    source(req.body.url)
      .then(function (html) {
        return parse(html);
      })
      .then(function (parsed) {
        res.status(200).send(parsed);
      })
      .catch(function (err) {
        res.status(400).send(err);
      });
  }
);

app.listen(8000);
