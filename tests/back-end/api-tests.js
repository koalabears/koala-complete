var shot = require('shot');
var test = require('tape');
var worknikAPI = require('../../apiQuery.js');


test("Testing if the correct definition is being returned", function(t){
  var expected = "Used to greet someone, answer the telephone, or express surprise.";
  // var data = wroknikAPI("hello");
  // t.equal(data, expected, "success!"); this will not wokr becasue it does not wait for your data to come back!!!!!!1!!!1!!
    worknikAPI("hello", function (data) {
      t.equal(data, expected, "success!");
        t.end();
      });

  // var url = req.hostname + word + req.path;
  // shot(api.worknikAPI, req, function(res){
  //   console.log(res);
  //   t.equal(res.url, "api.wordnik.com/v4/word.json/hello/definitions?limit=200&includeRelated=true&sourceDictionaries=ahd&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5");

});

// test("Check that the http request is working", function(t){
//   var req = {
//     method: "GET".
//     url:
//   }
// });
