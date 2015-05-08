var fs = require('fs');
var claves = JSON.parse(fs.readFileSync('./app/cfg/claves.json'));

module.exports = function (env, script, params) {

	var tabla = params[0].trim();

	var campos = [];
	for (var field in env.VALORES) {

		campos.push(field);

	}

	return campos.join(', ');

}