var app = require('express')(),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	manageJob = require('./tables/job'),
	entidadCanonica = require('./tables/entidad-canonica');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function definirServicio (file) {

	var servicio = require(file);
	var filename = file.replace(/^.*[\\|\/]/, '');
	var nombreServicio = filename.substring(0, filename.indexOf('.'));
	console.log('Servicio %s', nombreServicio);

	var url = '/' + nombreServicio;

	console.log('Publicando GET - %s...', url);
	app.get(url + '/:ID?', function (req, res) {

		if (!req.params.ID)
			req.params = undefined;

		var status = 200;
		var ret = servicio.read(req.params);
		if (!ret) {
			status = 404;
			ret = {};
		}
		res.status(status)
			.json(ret)
			.end();

	});

	console.log('Publicando POST - %s...', url);
	app.post(url, function (req, res) {
		res.json(servicio.create(req.body))
			.end();
	});

	console.log('Publicando PUT - %s...', url);
	app.put(url + '/:ID', function (req, res) {

		var status = 200;
		ret = servicio.update(req.params, req.body);

		if (!ret) {
			status = 404;
			ret = {}
		}

		res.json(ret)
			.end();
	});

	console.log('Publicando DELETE - %s...', url);
	app.delete(url + '/:ID', function (req, res) {

		var status = 200;
		var ret = servicio.delete(req.params);

		if (!ret) {
			status = 404;
			ret = {};
		}

		res.status(status)
			.json(ret)
			.end();
	});

}

function definirServicioJob () {

	console.log('Publicando GET - /job/:job/:tabla?/:id?...');
	app.get('/job/:job?/:tabla?/:ID?', function (req, res) {

		var status = 200;
		var job = {};
		var ret = {};

		if (req.params.ID) {

			ret = manageJob.getRegistro(req.params.job, req.params.tabla, req.params.ID);

		} else {

			if (req.params.tabla) {

				ret = manageJob.getRegistros(req.params.job, req.params.tabla);

			} else {

				if (req.params.job) {

					ret = manageJob.getJob(req.params.job);
				} else {

					ret = manageJob.getJob();

				}

			}

		} 

		if (ret == null) {
			ret = {};
			status = 404;
		}

		res.status(status)
			.json(ret)
			.end();

	});

	console.log('Publicando POST - /job/:job?/:tabla?...');
	app.post('/job/:job?/:tabla?', function (req, res) {

		var status = 200;
		var job;
		if (!req.params.job) {

			job = manageJob.addJob(req.body);
			if (job == null) {
				job = {};
				status = 500;
			} else {
				job.persist();
			}

		} else {
			job = manageJob.addRegistrosTojob(req.params.job, req.params.tabla, req.body);
			if (job == null) {
				job = {};
				status = 500;
			} else {
				manageJob.persist();
			}
		}

		res.status (status)
			.json(job)
			.end();

	}); 

}

fs.readdir(__dirname + '/tables', function (err, files) {

	if (err) throw err;

	files.forEach(function (file) {
		if(file.indexOf('.js') > 0 && file.indexOf('job') < 0)
			definirServicio(__dirname + '/tables/' + file);
	});

	definirServicioJob();

});

module.exports = app;