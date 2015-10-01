var http = require("http");
var serverFile = require("./server.js");
var worknikAPI = require("./apiQuery.js");
var port= process.env.PORT || 3000;

http.createServer(serverFile.handler).listen(port);
console.log('node http server listening on http://localhost:' + port);
