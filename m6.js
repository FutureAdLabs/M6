var Routing = function() {
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

	return {
		AddRoute: _addRoute,
		Process: _process
	};
}();

module.exports = Routing;