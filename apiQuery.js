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
    console.log('STATUS: ' + res.statusCode);
    res.setEncoding('utf8');
    var body = "";

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var newBody = JSON.parse(body);

      if (newBody && newBody[0]) {
        def = newBody[0].text;
        console.log(newBody);
        console.log(newBody[0]);
        console.log(def);
        console.log(typeof def);
        console.log('asdfghfgjyhtrsfadZX + ' + def);
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
