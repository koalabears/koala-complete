var http = require('http');

var worknikAPI = function(word, callback){
  var options = {
    hostname: "api.wordnik.com",
    port: 80,
    path: "/v4/word.json/" + word + "/definitions?limit=1&includeRelated=true&sourceDictionaries=ahd&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
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
      //console.log("this is from apiQuery.js", newBody[0].text);
      console.log("emmition finished!");
      console.log(newBody);
      if (newBody && newBody[0]) {
       def = newBody[0].text;
      }
      callback(def);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  // write data to request body
  req.write("");
  req.end();

};

// worknikAPI(word, function(definition){
//   response.end(definition);
// });

module.exports = worknikAPI;
