var http = require('http');
var m6 = require('./m6');

function simple(req, res) {
	res.writeHead(200, {"content-type" : "text/plain"});
    res.end('Simple\n');
}

function simpleParameter(req, res) {
	res.writeHead(200, {"content-type": "text/plain"});
	if(!req.params.value) {
		res.end('No parameter passed\n');
	} else {
		var response = 'Parameter value: ' + req.params.value + '\n';
		res.end(response);
	}
}

function simplePost(req, res) {
	res.writeHead(200, {"content-type" : "text/plain"});
    res.end('Simple Post\n');
}

m6.AddGetRoute('/simple', simple);
m6.AddGetRoute('/simpleparam/@value', simpleParameter);
m6.AddPostRoute('/simplepost', simplePost);

var server = http.createServer( function (req, res) {
	if(m6.Process(req, res) === false) {
    	res.writeHead(404, {"content-type" : "text/plain"});
    	res.end('Not found\n');
	}
  }
).listen(3333);