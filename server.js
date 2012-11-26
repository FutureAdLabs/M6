var http = require('http');
var routing = require('./routing/routing');

function simple(req, res) {
	res.writeHead(200, {"content-type" : "text/plain"});
    res.end('Simple');
}

routing.AddRoute('/simple', simple);

var server = http.createServer( function (req, res) {

	if(routing.Process(req, res) === false) {
    	res.writeHead(404, {"content-type" : "text/plain"});
    	res.end('Not found');
	}
  }
).listen(3333);