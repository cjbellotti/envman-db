var app = require('express')(),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	manageDb = require('./lib/manage-db');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var ambientes = JSON.parse(fs.readFileSync('./app/cfg/ambientes.json'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	console.log(req.body);
	next();
});

var ambientes = JSON.parse(fs.readFileSync('./app/cfg/ambientes.json'));

function definirServicio(instanciaExpress, nombreServicio, nombreTabla, config) {

  var url = '';

	url = '/' + nombreServicio + '/lastid';
	console.log('Definiendo servicio GET - %s', url);
	instanciaExpress.get(url , function (req, res) {

		var status = 200;
		manageDb({

			username : config.username,
			password : config.password,
			hostname : config.hostname,
			port : config.port,
			db : config.db,
			query : 'SELECT MAX(ID) FROM ' + nombreTabla

		}, function (err, result) {

			result = result || [];
			if (err || result.length == 0) {

				status = 404;
				result = {
					err : err || 'Inexistente'
				};

			} else {
	
				result = {

					ID : result[0]['MAX(ID)']

				};

			}
			res.status(status)
				.json(result)
				.end();

		});

	});

	url = '/' + nombreServicio + '/:id?';
	console.log('Definiendo servicio GET - %s', url);

	instanciaExpress.get(url , function (req, res) {

		var where = '';
		var status = 200;
		if (req.params.id)
			where = ' WHERE ID = ' + req.params.id;

		manageDb({

			username : config.username,
			password : config.password,
			hostname : config.hostname,
			port : config.port,
			db : config.db,
			query : 'SELECT * FROM ' + nombreTabla + where + ' ORDER BY ID '

		}, function (err, result) {

			result = result || [];
			if (err || result.length == 0) {

				status = 404;
				result = {
	
					err : err || 'Inexiste'

				};

			} else { 

				if (where.length > 0)
					result = result[0];

			}

			res.status(status)
				.json(result)
				.end();

		});

	});

}

for (var ambiente in ambientes) {

	for (var dc in ambientes[ambiente]) {
		definirServicio(app,
						'sistema/' + ambiente + '/' + ambientes[ambiente][dc].nombre, 
						'DTVLA.DVM_SISTEMA', 
						ambientes[ambiente][dc]);
		definirServicio(app,
						'entidad-canonica/' + ambiente + '/' + ambientes[ambiente][dc].nombre, 
						'DTVLA.DVM_ENTIDAD_CANONICA', 
						ambientes[ambiente][dc]);
		definirServicio(app,
						'valor-canonico/' + ambiente + '/' + ambientes[ambiente][dc].nombre, 
						'DTVLA.DVM_VALOR_CANONICO', 
						ambientes[ambiente][dc]);
		definirServicio(app,
						'valor-sistema/' + ambiente + '/' + ambientes[ambiente][dc].nombre, 
						'DTVLA.DVM_VALOR_SISTEMA', 
						ambientes[ambiente][dc]);
	}

}
module.exports = app;
