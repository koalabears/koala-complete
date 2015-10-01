var Server = require("./server.js");
var worknikAPI = require("./apiQuery.js");

Server.startServer();

worknikAPI('hello', function(definition){
  //response.end(definition);
  console.log(definition);
});
