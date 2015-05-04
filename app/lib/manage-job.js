var fs = require('fs'),
    _ = require('underscore');

var data = {};
var dataFile = "";
var functions = {};

function initialize (dataFilePath) {

	dataFile = dataFilePath;

	fs.readFile(dataFile, function (err, contentData) {

		if (err) throw err;

		data = JSON.parse(contentData);

	});

	return functions;

}

function getJob(nJob) {

	var index = _.findIndex(data, { job : parseInt(nJob) });
	var ret = null;
	if (index >= 0)
		ret = data[index];
	else
		ret = data;

	return ret;

}

functions.getJob = function (nJob) {

	return getJob(nJob);

}

functions.getRegistros = function(nJob, tabla) {

	var ret = null;
	var job = getJob(nJob);

	if (job != null) {

		ret = job.registros[tabla];

	}

	return ret;

}

functions.getRegistro = function (nJob, tabla, id) {

	var ret = null;
	ret = functions.getRegistros(nJob, tabla);

	if (ret != null) {

		var index = _.findIndex(ret, { ID : parseInt(id) });
		if (index >= 0)
			ret = ret[index];
	}

	return ret;

}

functions.addJob = function (jobData) {

	var lastJob = _.last(data) || { job : 0 };

	var id = lastJob.job + 1;

	jobData.target = 'DESA';
	jobData.job = id;

	data.push(jobData);

	return jobData;

}

functions.updateJob = function (nJob, jobData) {

	var ret = null;

	var index = _.findIndex(data, { job : parseInt(nJob) });

	if (index >= 0) {
		ret = jobData;
		data[index] = jobData;
	}

	return ret;

}

functions.removeJob = function (nJob) {

	var ret = null;

	var index = _.findIndex(data, { job : parseInt(nJob) });

	if (index >= 0)
		data = _.without(data, data[index]);

	return ret;

}

functions.addRegistrosTojob = function (nJob, tabla, reg) {

	var ret = null;

	var index = _.findIndex(data, { job : parseInt(nJob) });

	if (index >= 0) {

		var job = data[index];

		if (!job.registros[tabla])
			job.registros[tabla] = [];

		var lastReg = _.last(job.registros[tabla]) || { ID : 0 };
		var lastRegIndex = lastReg.ID + 1;

		if (!reg.ID || reg.ID == 0)
			reg.ID = lastRegIndex;

		job.registros[tabla].push(reg);

		data[index] = job;

		ret = reg;

	}

	return ret;

}

functions.updateRegistroFromJob = function (nJob, tabla, id, reg) {

	var ret = null;

	var index = _.findIndex(data, { job : parseInt(nJob) });

	if (index >= 0) {

		var job = data[index];

		if (!job.registros[tabla])
			job.registros[tabla] = [];

		var tab = job.registros[tabla];

		var match = false;
		for (var i = 0; i < tab.length && !match; i++) {

			if (tab[i].ID == id) {

				match = true;
				tab[i] = reg;
				job.registros[tabla] = tab;
				data[index] = job;

			}

		}

		if (match)
			ret = {};

	}

	return ret;

}

functions.removeRegistrosFromjob = function (nJob, tabla, id) {

	var ret = null;

	var index = _.findIndex(data, { job : parseInt(nJob) });

	if (index >= 0) {

		var job = data[index];

		if (!job.registros[tabla])
			job.registros[tabla] = [];

		var tab = job.registros[tabla];

		var match = false;
		for (var i = 0; i < tab.length && !match; i++) {

			if (tab[i].ID == id) {

				match = true;
				tab = _.without(tab, tab[i]);
				job.registros[tabla] = tab;
				data[index] = job;

			}

		}

		if (match)
			ret = {};

	}

	return ret;

}

functions.persist = function () {

	fs.writeFileSync(dataFile, JSON.stringify(data));

}

module.exports = initialize;