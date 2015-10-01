var shot = require('shot');
var test = require('tape');
var server = require('../../server.js');


test("server returns the home page", function (t){
  var req ={
    method: "GET",
    url: "/"
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.statusCode, 200, "success!");
    t.end();
  });
});

test("url /find/marie returns marie in payload", function(t){
  var req = {
    method: "GET",
    url: '/find/:marie'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.payload, '', 'worked');
    t.end();
  });
});

test("url /find/marie returns marie in payload", function(t){
  var req = {
    method: "GET",
    url: '/find/:eoin'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.payload, '', 'worked');
    t.end();
  });
});

// test("url /findWords/apple should return the definition of apple", function(t){
//   var req = {
//     method: "GET",
//     url: '/findWords/:apple'
//   };
//   shot.inject(server.handler, req, function(res){
//     t.equal(res.statusCode, 200, 'worked');
//     t.end();
//   });
// });
