var M6 = function() {
	var _routes = [];
	var _addGetRoute = function(url, action) {
		_addRoute(url, 'GET', action);
	};

	var _addPostRoute = function(url, action) {
		_addRoute(url, 'POST', action);
	};

	var _addRoute = function(url, method, action) {
		var item = {
			Url: url,
			Method: method,
			Action: action
		};
		_routes.push(item);
	};
  
	var _process = function(req, res) {
		var route = _getRoute(req);

		if(route) {
			var parameters = _getParameters(req, route);
			req.params = parameters;
			route.Action(req, res);
			return true;
		}

		return false;
	};

	var _getRoute = function(req) {
		var urlArray = req.url.split('/');
		for(var i = 0, length = _routes.length; i < length; i++) {
			if(_isMatch(urlArray, req.method, _routes[i])) {
				return _routes[i];
			}
		}
	};

	var _isMatch = function(urlArray, method, route) {
		if(route.Method !== method) { return false; }

		var routeUrlArray = route.Url.split('/');

		var match = true;
		for(var i = 0, length = routeUrlArray.length; i < length; i++) {
			var item = urlArray[i];
			if(item.indexOf('?') >= 0) {
				item = item.substr(0, item.indexOf('?'));
			}

			if(routeUrlArray[i] !== item && routeUrlArray[i][0] !== '@') { match = false; }
		}
		return match;
	};

	var _getParameters = function(req, route) {
		var urlArray = req.url.split('/');
		var parameters = {};
		var routeUrlArray = route.Url.split('/');
		for(var i = 0, length = routeUrlArray.length; i < length; i++) {
			if(routeUrlArray[i][0] === '@') {
				var key = routeUrlArray[i].substring(1);
				var value = urlArray[i];
				parameters[key] = value;
			}
		}

		_getQueryStringParameters(req, parameters);

		return parameters;
	};

	var _getQueryStringParameters = function(req, parameters) {
		var urlArray = req.url.split('/');
		var last = urlArray[urlArray.length - 1];
		if(last.indexOf('?') < 0) {
			return [];
		}

		var parameterString = last.substr(last.indexOf('?') + 1);
		var parameterStrings = parameterString.split('&');
		for(var i = 0, length = parameterStrings.length; i < length; i++) {
			var items = parameterStrings[i].split('=');

			if(items[0]) {
				parameters[items[0]] = items[1];
			}
		}
	};

	return {
		AddRoute: _addRoute,
		AddGetRoute: _addGetRoute,
		AddPostRoute: _addPostRoute,
		Process: _process
	};
}();

module.exports = M6;