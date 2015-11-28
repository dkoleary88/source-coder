// Main server file
// Serves static files from ../client
// Serves POST requests to /source endpoint

// external dependencies
var express = require('express');
var bodyParser = require('body-parser');

// internal dependencies
var source = require('./util/source');
var parse = require('./util/parse');

// instantiate express server
var app = express();

// dev dependencies
var morgan = require('morgan');
app.use(morgan('dev'));

// parse request body as json
app.use(bodyParser.json());

// server static files from public directory
app.use(express.static('./public'));

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
