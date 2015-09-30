var Server = (function() {
  var http = require('http');
  var api = require("./apiQuery");
  var port= process.env.PORT || 3000;
  // var auto = require('./main.js');
  var fs = require('fs');


  var index = fs.readFileSync(__dirname + '/public/html/index.html');

  function handler(req,res){
    var url = req.url;
    console.log("req.url:", url);

    if (url.match(/^(\/test)/)) {
      serveTest(req, res);
    } else if (url.length === 1){
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end(index.toString());
    } else if (url.match(/^(\/find\/:)/)){
      wordSearchCatch(req, res);
    } else {
      res.writeHead(404, {"Content-Type":"text/javascript"});
      res.end("error: " + req.url + " not found");
    }
  }

  function wordSearchCatch(req, res){
    // var queryCharNum = 7;
    console.log(req.url);
    res.writeHead(200, {"Content-Type":"text/plain"});
    var name = req.url.split(':')[1];
    console.log(name);
    res.end(name);
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

    api("hello");
  }

  return {
    startServer: startServer,
    handler: handler
  };
}());

module.exports = Server; //the function that we want to be exported when we call require('server');
