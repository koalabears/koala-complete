var Server = (function() {
  var http = require('http');
  var fs = require('fs');

  var port = process.env.PORT || 3000;

  var index = fs.readFileSync(__dirname + '/public/html/index.html');

  function handler(request,response){
    var url = request.url;
    console.log("request.url:", url);
    if (url.match(/^(\/test)/)) {
      serveTest(request, response);
    } else if (url.length === 1){
      response.writeHead(200, {"Content-Type":"text/html"});
      response.end(index.toString());
    } else {
      console.log("!")
      serveFromPublic(req, res);
    }
  }

  function serveFromPublic(req, res) {
    var url = req.url;
    var type = url.split('.')[1];
    switch (type) {
      case 'js' :
      response.writeHead(200, {"Content-Type":"text/javascript"});
      out = fs.readFileSync(__dirname + '/public/js' + url);
      response.end(index.toString());
    }

  }

  function serveTest(req, res) {
    console.log("serveTest called")
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
