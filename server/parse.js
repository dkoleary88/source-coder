var htmlparser = require("htmlparser2");
var prettyPrint = require('html').prettyPrint;

// hash to store all the tags counts from html
var tags = {};

// adds to tag count on tags hash
var addTag = function (tag) {
  tags[tag] = tags[tag] + 1 || 1;
};

// new parser instance of htmlparser2 - calls addTag with tag name on open tag
var parser = new htmlparser.Parser({
    onopentag: addTag
});

module.exports = function (html) {
  html = prettyPrint(html);
  parser.parseComplete(html);
  responseObj = {
    html: html,
    tags: tags
  };
  // return object with html as well as tag counts
  tags = {};
  return responseObj;
};
