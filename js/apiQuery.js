var http = require('http');
var env = require('env2')('./config.env');

var worknikAPI = function(word, callback) {
  var options = {
    hostname: "api.wordnik.com",
    port: 80,
    path: "/v4/word.json/" + word + "/definitions?limit=1&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=" + process.env.api_key,
    method: "GET"
  };

  var req = http.request(options, function(res) {
    var def;
    res.setEncoding('utf8');
    var body = "";

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var newBody = JSON.parse(body);

      if (newBody && newBody[0]) {
        def = newBody[0].text;
      }
      else {
        var msg = 'MESSAGE: No definition found. Please check your spelling and try again.';
        def = msg;
      }
      callback(def);
    });
  });

  req.write("");
  req.end();

};

module.exports = worknikAPI;
