var fs = require('fs');
var claves = JSON.parse(fs.readFileSync('./app/cfg/claves.json'));

module.exports = function (env, script, params) {

	var tabla = params[0].trim();

	var igualdad = [];
	for (var field in claves[tabla]) {

		var comillas = (typeof env.ORIGEN[field] == 'string') ? "'" : "";
		igualdad.push(field + ' = ' + comillas + env.ORIGEN[field] + comillas);

	}

	return igualdad.join(' and ');

}