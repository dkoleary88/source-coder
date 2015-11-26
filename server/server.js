var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('../client'));

app.use(bodyParser.json());

app.listen(8000);
