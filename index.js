// var express = require('express');
// var app = express();
var Http = require('http');

// app.set('port', (process.env.PORT || 5000));
var port = (process.env.PORT || 4000);
// app.use(express.static(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

function handler(req, res) {
  console.log(process.env.PORT);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end("<h1>WOAH</h1>");
}

Http.createServer(handler).listen(port);
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
