var Server = (function() {
  var http = require('http');
  var worknikAPI = require("./apiQuery");
  var port= process.env.PORT || 3000;
  // var auto = require('./main.js');
  var fs = require('fs');


  var index = fs.readFileSync(__dirname + '/public/html/index.html');

  var wordList;

  var getWords = function (callback) {
    if (!callback || typeof callback !== 'function') {
      return new Error('callback argument MUST be a function');
    }
    var filename = __dirname + '/words.txt';
    fs.readFile(filename, 'utf8', function (err, data) {
      var words = data.split('\n');
      return callback(err, words);
    });
  };

  getWords(function(err, acWords) {
    console.log(acWords[0]);
    wordList = acWords;
  });



  function handler(req,res){
    var url = req.url;
    console.log("req.url:", url);
    if (url.match(/^(\/test)/)) {
      serveTest(req, res);
    } else if (url.length === 1){
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(index.toString());
    } else if (url.match(/^(\/find\/:)/)){
      findWords(req, res);
    } else if (url.match(/^(\/findWords\/:)/)) {
      wordSearchCatch(req, res);
    } else {
      console.log("!");
      serveFromPublic(req, res);
    }
  }

  function serveFromPublic(req, res) {
    var url = req.url;
    var type = url.split('.')[1];
    switch (type) {
      case 'js' :
        res.writeHead(200, {"Content-Type":"text/javascript"});
        out = fs.readFileSync(__dirname + '/public/js' + url);
        res.end(out.toString());
        break;
      case 'css' :
        res.writeHead(200, {"Content-Type":"text/css"});
        out = fs.readFileSync(__dirname + '/public/css' + url);
        res.end(out.toString());
        break;
      case 'html' :
        res.writeHead(200, {"Content-Type":"text/html"});
        out = fs.readFileSync(__dirname + '/public/html' + url);
        res.end(out.toString());
        break;
    }
  }

  function splitByColon(str) {
    return str.split(':')[1];
  }

//Lookup word suggestions
  function wordSearchCatch(req, res){
    // var queryCharNum = 7;
    res.writeHead(200, {"Content-Type":"text/plain"});
    var searchTerm = splitByColon(req.url);
    //console.log(name);

    //def = 3 letters
    // use it to get an aray of strings (use nelsons function)
    // put the array into res.end()!

    var findWord = function (word, words, callback) {
    // who wants to volunteer to implement the method?
      var found = [];
      for (var i = 0; i < words.length; i++) {
        if (words[i].search(word) === 0) {
          found.push(words[i]);
        }
      }
      return callback(found);
    };

    findWord(searchTerm, wordList, function(found) {
      console.log("seach term in find word callback: " + found);
      res.end(found.toString());
    });

  }

//findWords - find and return definition of word.
  function findWords (req, res) {
    res.writeHead(200, {"Content-Type" : "text/plain"});
    var name = splitByColon(req.url);

    worknikAPI(name, function(definition){
      console.log("xxx" + definition);
      res.end(definition);
    });
  }


  function serveTest(req, res) {
    console.log("serveTest called");
    var test  = fs.readFileSync(__dirname + '/tests/front-end/test.html');
    var testjs  = fs.readFileSync(__dirname + '/tests/front-end/test.js');
    if (req.url === "/test.html/"){
      // console.log("test.html served");
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(test.toString());
    } else if (req.url === "/test.html/test.js"){
      res.writeHead(200, {"Content-Type":"text/javascript"});
      res.end(testjs.toString());
    } else {
      res.writeHead(404, {"Content-Type":"text/javascript"});
      res.end("error: " + req.url + " not found");
    }
  }
  function startServer() {
    http.createServer(handler).listen(port);

    console.log('node http server listening on http://localhost:' + port);


}
  return {
    startServer: startServer,
    handler: handler
  };

}());
module.exports = Server; //the function that we want to be exported when we call require('server');
