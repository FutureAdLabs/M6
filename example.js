var http = require('http');
var m6 = require('./m6');

function simple(req, res) {
	res.writeHead(200, {"content-type" : "text/plain"});
    res.end('Simple');
}

function simpleParameter(req, res) {
	res.writeHead(200, {"content-type": "text/plain"});
	if(!req.params.value) {
		res.end('No parameter passed');
	} else {
		var response = 'Parameter value: ' + req.params.value;
		res.end(response);
	}
}

m6.AddRoute('/simple', simple);
m6.AddRoute('/simpleparam/@value', simpleParameter);

var server = http.createServer( function (req, res) {
	if(m6.Process(req, res) === false) {
    	res.writeHead(404, {"content-type" : "text/plain"});
    	res.end('Not found');
	}
  }
).listen(3333);