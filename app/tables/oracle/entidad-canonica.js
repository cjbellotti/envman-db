var request = require('sync-request');

function initialize (connectionData) {

	var functions = {};

	functions.create = function (contentData) {
	
    var result = request('GET', 'http://localhost:5000/');
	 	return obtenerDatos.create(contentData);

	}

	functions.read = function (query) {

		return obtenerDatos.read(query);
	}

	functions.update = function (query, contentData) {

		return obtenerDatos.update(query, contentData);

	}

	functions.delete = function(query) {

		return obtenerDatos.delete(query);

	}

	functions.lastId = function() {
		return obtenerDatos.lastId();
	}

	return functions;

}

module.exports = initialize;
