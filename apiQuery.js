var http = require('http');

var worknikAPI = function(word){
  console.log("hooray");
  var options = {
    hostname: "api.wordnik.com",
    port: 80,
    path: "/v4/word.json/" + word + "/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
    method: "GET"
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    res.setEncoding('utf8');
    var body = "";
    res.on('data', function(chunk) {
    console.log(chunk);
    body += chunk;
    });
    res.on('end', function() {
      console.log(body);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  // write data to request body
  req.write("");
  req.end();

};

module.exports = worknikAPI;
