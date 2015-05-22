var manageJob = require('../tables/job');
var fs = require('fs');
var _ = require('underscore');

var ambientes = JSON.parse(fs.readFileSync('./app/cfg/ambientes.json'));

var tables = {};
var incrementoID = 0;
var verificaciones = [];

for (var key in ambientes) {

	tables[key] = {};
	for (var indexdc in ambientes[key]) {

			var dc = ambientes[key][indexdc];
			tables[key][dc.nombre] = {};
			tables[key][dc.nombre].entidadcanonica = require('../tables/entidad-canonica')(dc);
			tables[key][dc.nombre].sistema = require('../tables/sistema')(dc);
			tables[key][dc.nombre].valorcanonico = require('../tables/valor-canonico')(dc);
			tables[key][dc.nombre].valorsistema = require('../tables/valor-sistema')(dc);

	}

}

fs.readdir(__dirname + '/verifications', function (err, files) {

	if (err) throw err;
	
	console.log('Verificaciones:');
	files.forEach(function (file) {

		var validacionNombreArchivo = /^[A-Za-z0-9\-]+\.js$/g;
		if(validacionNombreArchivo.exec(file) != null) {

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

	if (job) {

		result = {};
		for (var dc in tables[job.target]) {

				result[dc] = job.registros;
				var tabla = tables[job.target][dc];

				for (var indexVerificacion in verificaciones) {

					result[dc] = verificaciones[indexVerificacion](tabla,  result[dc]);

				}

		}

	}

	return result;

};

module.exports = verificarJob;
