var shot = require('shot');
var test = require('tape');
var server = require('../../server.js');
var worknikAPI = require("../../apiQuery");

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

// test("url /find/banana returns banana in payload", function(t){
//   var req = {
//     method: "GET",
//     url: '/find/:banana'
//   };
//   shot.inject(server.handler, req, function(res){
//     t.equal(res.payload, 'banana', 'worked');
//     t.end();
//   });
// });

test("testing functionality of serveTest", function(t){
  var req = {
    method: "GET",
    url: '/test.html/'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.statusCode, 200, 'test.html exists');
    t.end();
  });
});

test("testing serveTest - test.js file", function(t){
  var req = {
    method: "GET",
    url: '/test.html/test.js'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.statusCode, 200, 'findWords works');
    t.end();
  });
});

test("testing non-existent file in ./test", function(t){
  var req = {
    method: "GET",
    url: '/test.css'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.statusCode, 404, 'findWords works');
    t.end();
  });
});


test("testing functionality of findWords - word with a definition", function(t){
  var req = {
    method: "GET",
    url: '/find/:apple'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.statusCode, 200, 'findWords works');
    t.end();
  });
});

test("testing functionality of findWords - no definition", function(t){
  var req = {
    method: "GET",
    url: '/find/:carrie'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.statusCode, 200, 'findWords works');
    t.end();
  });
});

test("testing functionality of wordSearchCatch", function(t){
  var req = {
    method: "GET",
    url: '/findWords/:banana'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.payload, 'banana', 'wordSearchCatch works');
    t.end();
  });
});

test("testing serveFromPublic - html file", function(t){
  var req = {
    method: "GET",
    url: '/index.html'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.statusCode, 200, 'findWords works');
    t.end();
  });
});

// test("testing serveFromPublic - css file - expected to fail because file non-existent", function(t){
//   var req = {
//     method: "GET",
//     url: '/main.css'
//   };
//   shot.inject(server.handler, req, function(res){
//     t.equal(res.statusCode, 404, 'findWords works');
//     t.end();
//   });
// });

test("testing serveFromPublic - js file", function(t){
  var req = {
    method: "GET",
    url: '/main.js'
  };
  shot.inject(server.handler, req, function(res){
    t.equal(res.statusCode, 200, 'findWords works');
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
