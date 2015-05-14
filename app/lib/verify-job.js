var manageJob = require('../tables/job');
var fs = require('fs');
var _ = require('underscore');

var ambientes = JSON.parse(fs.readFileSync('./app/cfg/ambientes.json'));

var tables = {};
var incrementoID = 0;
var verificaciones = [];

for (var key in ambientes) {

	tables[key] = {};
	tables[key].entidadcanonica = require('../tables/entidad-canonica')(ambientes[key]);
	tables[key].sistema = require('../tables/sistema')(ambientes[key]);
	tables[key].valorcanonico = require('../tables/valor-canonico')(ambientes[key]);
	tables[key].valorsistema = require('../tables/valor-sistema')(ambientes[key]);

}

fs.readdir(__dirname + '/verifications', function (err, files) {

	if (err) throw err;

	console.log('Verificaciones:');
	files.forEach(function (file) {
		if(file.indexOf('.js') > 0) {

			console.log('\t - ' + file);
			verificaciones.push(require(__dirname + '/verifications/' + file));

		}
	});

});

function verificarJob(nroJob) {

	var result = null;

	var job = {};

	if (_.isObject(nroJob)) {

		job.target = nroJob.target;
		job.registros = nroJob.registros;

	} else {

		job = manageJob.getJob(nroJob);

	}
	//var job = manageJob.getJob(nJob);

	if (job) {

		result = job.registros;

		var tabla = tables[job.target];

		for (var indexVerificacion in verificaciones) {

			result = verificaciones[indexVerificacion](tabla,  result);

		}

	}

	return result;

};

module.exports = verificarJob;