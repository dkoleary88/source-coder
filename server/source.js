var request = require('request');

module.exports = function (url) {
  return new Promise (function (resolve, reject) {
    // sends get request to given url and resolves with response body
    request(url, function (err, _, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};
