var manageJob = require('../tables/job');
var generarScript = require('./generar-script-dvm-v2');

function wrapGenerarScript(job) {

	var result = {};
	for (var dc in job) {

		result[dc] = generarScript(job[dc]);

	}

	return result;

}
module.exports = wrapGenerarScript;
