# M6

A simple routing module for node.js

install
------
    npm install m6

usage
------
	Create routes with action functions such as the following example:

	```javascript
	m6.AddGetRoute('/simple', function(req, res) {
		res.writeHead(200, {"content-type" : "text/plain"});
    	res.end('Simple Action\n');
	});
	```

	this will route to the 'GET' method, you can also route to 'POST' requests by using the function AddPostRoute.

	You can also pass parameters through to the action method on the url by denoting them with a '@' character:

	```javascript
	m6.AddGetRoute('/simpleParameter/@value', function (req, res) {
		res.writeHead(200, {"content-type": "text/plain"});
		if(!req.params.value) {
			res.end('No parameter passed\n');
		} else {
			var response = 'Parameter value: ' + req.params.value + '\n';
			res.end(response);
		}
	});
	```
	Querystring parameters will also be passed through on the req.params object.