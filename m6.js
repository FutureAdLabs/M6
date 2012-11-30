var M6 = function() {
	var _routes = [];
	var _addRoute = function(url, action) {
		var route = {
			Url: url,
			Action: action
		};

		_routes.push(route);
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
		for(var i = 0, length = _routes.length; i < length; i++) {
			if(req.url === _routes[i].Url) {
				return _routes[i];
			}
		}
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

		return parameters;
	};

	return {
		AddRoute: _addRoute,
		Process: _process
	};
}();

module.exports = M6;