var m6 = require('../m6');
var should = require('should');

describe("Routing", function() {
	it('should route GET requests', function(done) {
		m6.AddGetRoute('/simpleget', function(req, res) {
			done();
		});

		var req = {
			url: '/simpleget',
			method: 'GET'
		};

		m6.Process(req);
	});

	it('should route POST requests', function(done) {
		m6.AddPostRoute('/simplepost', function(req, res) {
			done();
		});

		var req = {
			url: '/simplepost',
			method: 'POST'
		};

		m6.Process(req);
	});

	it('should route PUT requests', function(done) {
		m6.AddRoute('/simpleput', 'PUT', function(req, res) {
			done();
		});

		var req = {
			url: '/simpleput',
			method: 'PUT'
		};

		m6.Process(req);
	});

	it('should route DELETE requests', function(done) {
		m6.AddRoute('/simpledelete', 'DELETE', function(req, res) {
			done();
		});

		var req = {
			url: '/simpledelete',
			method: 'DELETE'
		};

		m6.Process(req);
	});

	it('should not route unknown requests', function() {
		var req = {
			url: '/unknown',
			method: 'GET'
		};

		var result = m6.Process(req);

		result.should.equal(false);
	});
});

describe("Parameters", function() {
	var urlParameterValue = '';
	var qsParameterValue = '';
	var qsParameterValue2 = '';
	var qsParameterValue3 = '';
	var urlParameterValue2 = '';
	var qsParameterValue4 = '';
	var urlParameterValue3 = '';
	var urlParameterValue4 = '';

	before(function(done) {	
		m6.AddGetRoute('/urlparameter/@value', function(req, res) {
			urlParameterValue = req.params.value;
		});

		m6.AddGetRoute('/qsparameter', function(req, res) {
			qsParameterValue = req.params.qsvalue;
		});

		m6.AddGetRoute('/qsparameter2', function(req, res) {
			qsParameterValue2 = req.params.qsvalue2;
			qsParameterValue3 = req.params.qsvalue3;
		});

		m6.AddGetRoute('/parameter/@valueone', function(req, res) {
			urlParameterValue2 = req.params.valueone;
			qsParameterValue4 = req.params.valuetwo;
		});

		m6.AddGetRoute('/multipleurlparams/@valueone/@valuetwo', function(req, res) {
			urlParameterValue3 = req.params.valueone;
			urlParameterValue4 = req.params.valuetwo;
			done();
		});

		var req = {
			url: '/urlparameter/5',
			method: 'GET'
		};

		m6.Process(req);

		var req2 = {
			url: '/qsparameter?qsvalue=10',
			method: 'GET'
		};

		m6.Process(req2);

		var req3 = {
			url: '/qsparameter2?qsvalue2=100&qsvalue3=200',
			method: 'GET'
		};

		m6.Process(req3);

		var req4 = {
			url: '/parameter/500?valuetwo=800',
			method: 'GET'
		};

		m6.Process(req4);

		var req5 = {
			url: '/multipleurlparams/1000/2000',
			method: 'GET'
		};

		m6.Process(req5);
	});

	it('should pass through url parameters to action', function() {
		urlParameterValue.should.equal('5');
	});

	it('should pass through multiple url params to action', function() {
		urlParameterValue3.should.equal('1000');
		urlParameterValue4.should.equal('2000');
	});

	it('should pass through query string parameters to action', function() {
		qsParameterValue.should.equal('10');
	});

	it('should pass through multiple query string parameters to action', function() {
		qsParameterValue2.should.equal('100');
		qsParameterValue3.should.equal('200');
	});

	it('should pass through url and query string parameters to action', function() {
		urlParameterValue2.should.equal('500');
		qsParameterValue4.should.equal('800');
	});
});