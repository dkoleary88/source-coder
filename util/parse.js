// Builds response body object for use by client
// Builds a tags hash with tag counts
// Adds <span> tag with #id for style that wraps around each tag in HTML
// Escapes all HTML

var htmlparser = require("htmlparser2");
var styleSpan = require('./pretty').styleSpan;

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
  // populate tags hash with values
  tags = {};
  parser.parseComplete(html);

  // add id'd span tags and escapes html
  html = styleSpan(html);

  // return object with parsed html and tag counts
  return {
    html: html,
    tags: tags
  };

};
