var fs = require('fs');
var claves = JSON.parse(fs.readFileSync('./app/cfg/claves.json'));

module.exports = function (env, script, params) {

	var tabla = params[0].trim();

	var igualdad = [];
	for (var field in env.VALORES) {

		if (!claves[tabla][field] && field != 'ID') {
			var comillas = (typeof env.VALORES[field] == 'string') ? "'" : "";
			igualdad.push(field + ' = ' + comillas + env.VALORES[field] + comillas);
		}

	}

	return igualdad.join(', ');

}