var Server = (function() {
  var http = require('http');
  var port= process.env.PORT || 3000;
  // var auto = require('./main.js');
  var fs = require('fs');
  var index = fs.readFileSync(__dirname + '/public/html/index.html');
  var test  = fs.readFileSync(__dirname + '/tests/front-end/test.html');
  var testjs  = fs.readFileSync(__dirname + '/tests/front-end/test.js');


  function handler(request,response){
    var url = request.url;
    console.log("request.url:", url);
    if (url === "/test.html/"){
      // console.log("test.html served");
      response.writeHead(200, {"Content-Type":"text/html"});
      response.end(test.toString());
    } else if (url === "/test.html/test.js"){
      response.writeHead(200, {"Content-Type":"text/javascript"});
      response.end(testjs.toString());
    } else if (url.length === 1){
      response.writeHead(200, {"Content-Type":"text/html"});
      response.end(index.toString());
    } else {
      response.end("URL IS MORE THAN 1");
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
