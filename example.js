var http = require('http');
var m6 = require('./m6');

function simple(req, res) {
	res.writeHead(200, {"content-type" : "text/plain"});
    res.end('Simple');
}

m6.AddRoute('/simple', simple);

var server = http.createServer( function (req, res) {

	if(m6.Process(req, res) === false) {
    	res.writeHead(404, {"content-type" : "text/plain"});
    	res.end('Not found');
	}
  }
).listen(3333);