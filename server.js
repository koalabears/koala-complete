var Server = (function() {
  var http = require('http');
  var fs = require('fs');

  var port = process.env.PORT || 3000;

  var index = fs.readFileSync(__dirname + '/public/html/index.html');

  function handler(request,response){
    var url = request.url;
    console.log("request.url:", url);
    if (url.match(/^(test)/)) {
      serveTest(request, response);
    } else if (url.length === 1){
      response.writeHead(200, {"Content-Type":"text/html"});
      response.end(index.toString());
    } else {
      response.writeHead(404, {"Content-Type":"text/javascript"});
      response.end("error: file not found");
    }
  }

  function serveTest(req, res) {
    var test  = fs.readFileSync(__dirname + '/tests/front-end/test.html');
    var testjs  = fs.readFileSync(__dirname + '/tests/front-end/test.js');
    if (url === "/test.html/"){
      // console.log("test.html served");
      response.writeHead(200, {"Content-Type":"text/html"});
      response.end(test.toString());
    } else if (url === "/test.html/test.js"){
      response.writeHead(200, {"Content-Type":"text/javascript"});
      response.end(testjs.toString());
    } else {
      response.writeHead(404, {"Content-Type":"text/javascript"});
      response.end("error: test not found");
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
