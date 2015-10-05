var server = (function() {
  var http = require('http');
  var worknikAPI = require("./apiQuery");
  var port= process.env.PORT || 3000;
  // var auto = require('./main.js');
  var fs = require('fs');


  var index = fs.readFileSync(__dirname + '/../public/html/index.html');

  var wordList;

  var getWords = function (callback) {
    if (!callback || typeof callback !== 'function') {
      return new Error('callback argument MUST be a function');
    }
    var filename = __dirname + '/../words.txt';
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
    console.log("URL: " + url);

    if (url.length === 1){
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(index.toString());
    } else if (url.match(/^(\/test)/)) {
      serveTest(req, res);
    } else if (url.match(/^(\/find\/:)/)){
      findWords(req, res);
    } else if (url.match(/^(\/findWords\/:)/)) {
      wordSearchCatch(req, res);
    } else {
      serveFromPublic(req, res);
    }
  }

  function serveFromPublic(req, res) {
    var url = req.url;
    var root = '/../public/';
    var type = url.split('.')[1];
    switch (type) {
      case 'js' :
        res.writeHead(200, {"Content-Type":"text/javascript"});
        out = fs.readFileSync(__dirname + root + 'js' + url);
        res.end(out.toString());
        break;
      case 'css' :
        res.writeHead(200, {"Content-Type":"text/css"});
        out = fs.readFileSync(__dirname + root + 'stylesheets' + url);
        res.end(out.toString());
        break;
      case 'html' :
        res.writeHead(200, {"Content-Type":"text/html"});
        out = fs.readFileSync(__dirname + root + 'html' + url);
        res.end(out.toString());
        break;
    }
  }

  function splitByColon(str) {
    return str.split(':')[1];
  }

//Lookup word suggestions
  function wordSearchCatch(req, res){

    res.writeHead(200, {"Content-Type":"text/plain"});
    var searchTerm = splitByColon(req.url);

    var findWord = function (word, words, callback) {
      var found = [];
      for (var i = 0; i < words.length; i++) {
        if (words[i].search(word) === 0) {
          found.push(words[i]);
        }
      }
      return callback(found);
    };

    findWord(searchTerm, wordList, function(found) {
      res.end(found.toString());
    });

  }

//findWords - find and return definition of word.
  function findWords (req, res) {
    res.writeHead(200, {"Content-Type" : "text/plain"});
    var name = splitByColon(req.url);

    worknikAPI(name, function(definition){
      res.end(definition);

    });
  }


  function serveTest(req, res) {
    var test  = fs.readFileSync(__dirname + '/../tests/front-end/test.html');
    var testjs  = fs.readFileSync(__dirname + '/../tests/front-end/test.js');
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
  return {
    handler: handler
  };

}());
module.exports = server; //the function that we want to be exported when we call require('server');
