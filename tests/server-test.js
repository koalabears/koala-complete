var shot = require('shot');
var test = require('tape');
var server = require('../server.js');



test("server returns the home page", function (t){
  var request ={
    method: "GET",
    url: "/"
  };
  shot.inject(server.handler, request, function(res){
    t.equal(res.statusCode, 200, "success!");
    t.end();
  });
});

// test("server returns the home page", function (t){
//   var request ={
//     method: "GET",
//     url: "/"
//   };
//   shot.inject(server.handler, request, function(res){
//     t.equal(res.statusCode, 200, "success!");
//     t.end();
//   });
// });
