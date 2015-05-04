var request = require('supertest-as-promised'),
	async = require('async'),
	expect = require('chai').expect,
	express = require('express'),
	services = require('../app/services');

var app = express();

var job;

app.use(services);

request = request(app);

describe('CRUD entidad canonica.', function () {

	it('Crea una entidad canonica', function (done) {

		var data = { 
			ID : 12346,
			NOMBRE : "Entidad 1234",
			DESCRIPCION : "Customer 1's lastname"
		};

		async.waterfall ([

			function crearEntidadCanonica (callback) {

				request
					.post ('/entidad-canonica/DESA')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerEntidadCanonica (res, callback) {

				request
					.get ('/entidad-canonica/DESA/12346')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaEntidadCanonica (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('NOMBRE', data.NOMBRE);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Actualiza una entidad canonica', function (done) {

		var data = { 
			ID : 12346,
			NOMBRE : "Entidad 1234M",
			DESCRIPCION : "Customer 1's lastnameM"
		};

		async.waterfall ([

			function modificarEntidadCanonica (callback) {

				request
					.put ('/entidad-canonica/DESA/12346')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerEntidadCanonica (res, callback) {

				request
					.get ('/entidad-canonica/DESA/12346')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaEntidadCanonica (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('NOMBRE', data.NOMBRE);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Obtener una entidad canonica', function (done) {

		var data = { 
			ID : 12346,
			NOMBRE : "Entidad 1234M",
			DESCRIPCION : "Customer 1's lastnameM"
		};

		async.waterfall ([

			function obtenerEntidadCanonica (callback) {

				request
					.get ('/entidad-canonica/DESA/12346')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaEntidadCanonica (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('NOMBRE', data.NOMBRE);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Borra una entidad canonica', function (done) {

		request
			.delete ('/entidad-canonica/DESA/12346')
			.expect(200)
			.end ();

		done();

	});

});

describe('CRUD sistema.', function () {

	it('Crea un sistema', function (done) {

		var data = {

			"PAIS" : "PE",
			"ID" : 22,
			"NOMBRE" : "MR23",
			"DESCRIPCION" : "IBS MR23"

		};

		async.waterfall ([

			function crearSistema (callback) {

				request
					.post ('/sistema/DESA')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerSistema (res, callback) {

				request
					.get ('/sistema/DESA/22')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaSistema (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('PAIS', data.PAIS);
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('NOMBRE', data.NOMBRE);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Actualiza un sistema', function (done) {

		var data = {

			"PAIS" : "PE",
			"ID" : 22,
			"NOMBRE" : "MR23ZZ",
			"DESCRIPCION" : "IBS MR23ZZ"

		};

		async.waterfall ([

			function modificarSistema (callback) {

				request
					.put ('/sistema/DESA/22')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerSistema (res, callback) {

				request
					.get ('/sistema/DESA/22')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaSistema (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('PAIS', data.PAIS);
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('NOMBRE', data.NOMBRE);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Obtener un sistema', function (done) {

		var data = {

			"PAIS" : "PE",
			"ID" : 22,
			"NOMBRE" : "MR23ZZ",
			"DESCRIPCION" : "IBS MR23ZZ"

		};

		async.waterfall ([

			function obtenerSistema (callback) {

				request
					.get ('/sistema/DESA/22')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaSistema (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('PAIS', data.PAIS);
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('NOMBRE', data.NOMBRE);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Borra una entidad canonica', function (done) {

		request
			.delete ('/sistema/DESA/22')
			.expect(200)
			.end ();

		done();

	});

});

describe('CRUD valor canonico.', function () {

	it('Crea un valor canonico', function (done) {

		var data = {

			"ID" : 1421,
			"ID_ENTIDAD_CANONICA" : 7,
			"VALOR_CANONICO" : "A",
			"DESCRIPCION" : "A"

		};

		async.waterfall ([

			function crearValorCanonico (callback) {

				request
					.post ('/valor-canonico/DESA')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerValorCanonico (res, callback) {

				request
					.get ('/valor-canonico/DESA/1421')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaValorCanonico (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('ID_ENTIDAD_CANONICA', data.ID_ENTIDAD_CANONICA);
				expect(resData).to.have.property('VALOR_CANONICO', data.VALOR_CANONICO);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Actualiza un valor canonico', function (done) {

		var data = {

			"ID" : 1421,
			"ID_ENTIDAD_CANONICA" : 7,
			"VALOR_CANONICO" : "AZZ",
			"DESCRIPCION" : "AZZ"

		};

		async.waterfall ([

			function modificarValorCanonico (callback) {

				request
					.put ('/valor-canonico/DESA/1421')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerValorCanonico (res, callback) {

				request
					.get ('/valor-canonico/DESA/1421')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaValorCanonico (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('ID_ENTIDAD_CANONICA', data.ID_ENTIDAD_CANONICA);
				expect(resData).to.have.property('VALOR_CANONICO', data.VALOR_CANONICO);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Obtener un valor canonico', function (done) {

		var data = {

			"ID" : 1421,
			"ID_ENTIDAD_CANONICA" : 7,
			"VALOR_CANONICO" : "AZZ",
			"DESCRIPCION" : "AZZ"

		};

		async.waterfall ([

			function obtenerValorCanonico (callback) {

				request
					.get ('/valor-canonico/DESA/1421')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaValorCanonico (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('ID_ENTIDAD_CANONICA', data.ID_ENTIDAD_CANONICA);
				expect(resData).to.have.property('VALOR_CANONICO', data.VALOR_CANONICO);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Borra una valor canonico', function (done) {

		request
			.delete ('/valor-canonico/DESA/1421')
			.expect(200)
			.end ();

		done();

	});

});

describe('CRUD valor sistema.', function () {

	it('Crea un valor sistema', function (done) {

		var data = {

			"ID" : 1421,
			"ID_SISTEMA" : 2,
			"VALOR_SISTEMA" : "1",
			"ID_VALOR_CANONICO" : 6,
			"ID_ENTIDAD_CANONICA" : 9

		};

		async.waterfall ([

			function crearValorSistema (callback) {

				request
					.post ('/valor-sistema/DESA')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerValorSistema (res, callback) {

				request
					.get ('/valor-sistema/DESA/1421')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaValorSistema (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('ID_SISTEMA', data.ID_SISTEMA);
				expect(resData).to.have.property('VALOR_SISTEMA', data.VALOR_SISTEMA);
				expect(resData).to.have.property('ID_VALOR_CANONICO', data.ID_VALOR_CANONICO);
				expect(resData).to.have.property('ID_ENTIDAD_CANONICA', data.ID_ENTIDAD_CANONICA);
				callback(null);

			}
		], done);

	});

	it('Actualiza un valor sistema', function (done) {

		var data = {

			"ID" : 1421,
			"ID_SISTEMA" : 2,
			"VALOR_SISTEMA" : "1",
			"ID_VALOR_CANONICO" : 6,
			"ID_ENTIDAD_CANONICA" : 9

		};

		async.waterfall ([

			function modificarValorCanonico (callback) {

				request
					.put ('/valor-sistema/DESA/1421')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerValorCanonico (res, callback) {

				request
					.get ('/valor-sistema/DESA/1421')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaValorCanonico (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('ID_SISTEMA', data.ID_SISTEMA);
				expect(resData).to.have.property('VALOR_SISTEMA', data.VALOR_SISTEMA);
				expect(resData).to.have.property('ID_VALOR_CANONICO', data.ID_VALOR_CANONICO);
				expect(resData).to.have.property('ID_ENTIDAD_CANONICA', data.ID_ENTIDAD_CANONICA);
				callback(null);

			}
		], done);

	});

	it('Obtener un valor sistema', function (done) {

		var data = {

			"ID" : 1421,
			"ID_SISTEMA" : 2,
			"VALOR_SISTEMA" : "1",
			"ID_VALOR_CANONICO" : 6,
			"ID_ENTIDAD_CANONICA" : 9

		};

		async.waterfall ([

			function obtenerValorSistema (callback) {

				request
					.get ('/valor-sistema/DESA/1421')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaValorSistema (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('ID_SISTEMA', data.ID_SISTEMA);
				expect(resData).to.have.property('VALOR_SISTEMA', data.VALOR_SISTEMA);
				expect(resData).to.have.property('ID_VALOR_CANONICO', data.ID_VALOR_CANONICO);
				expect(resData).to.have.property('ID_ENTIDAD_CANONICA', data.ID_ENTIDAD_CANONICA);
				callback(null);

			}
		], done);

	});

	it('Borra una valor sistema', function (done) {

		request
			.delete ('/valor-sistema/DESA/1421')
			.expect(200)
			.end ();

		done();

	});

});

describe('CRUD job.', function () {

	it('Crea un job', function (done) {

		var data = {
			"proyecto": "TEST - Proyecto de prueba.",
			"descripcion": "Descripcion del Job 12345",
			"registros": {
				"sistema": [ ],
				"entidadcanonica": [ ],
				"valorcanonico": [ ],
				"valorsistema": [ ]
			}
		};

		async.waterfall ([

			function crearJob (callback) {

				request
					.post ('/job')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerJob (res, callback) {

				job = res.body.job;

				request
					.get ('/job/' + res.body.job)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaJob (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('job');
				expect(resData).to.have.property('proyecto', data.proyecto);
				expect(resData).to.have.property('descripcion', data.descripcion);
				expect(resData).to.have.property('registros');
				callback(null);

			}
		], done);

	});

	it('Crea un registros en una tabla del job', function (done) {

		var data = {

			"PAIS" : "AR",
			"ID" : 12,
			"NOMBRE" : "MR23",
			"DESCRIPCION" : "IBS MR23"

		};

		async.waterfall ([

			function crearRegistroEnTablaSistema (callback) {

				request
					.post ('/job/' + job + '/sistema')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerRegistroDeTablaSistema (res, callback) {

				request
					.get ('/job/' + job + '/sistema/12')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaRegistroDeTablaSistema (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('PAIS', data.PAIS);
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('NOMBRE', data.NOMBRE);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Obtiene un registros de una tabla del job', function (done) {

		var data = {

			"PAIS" : "AR",
			"ID" : 12,
			"NOMBRE" : "MR23",
			"DESCRIPCION" : "IBS MR23"

		};

		async.waterfall ([

			function obtenerRegistroDeTablaSistema (callback) {

				request
					.get ('/job/' + job + '/sistema/12')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaRegistroDeTablaSistema (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('PAIS', data.PAIS);
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('NOMBRE', data.NOMBRE);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Modificar un registros en una tabla del job', function (done) {

		var data = {

			"PAIS" : "AR",
			"ID" : 12,
			"NOMBRE" : "MR23ZZ",
			"DESCRIPCION" : "IBS MR23ZZ"

		};

		async.waterfall ([

			function modificarRegistroEnTablaSistema (callback) {

				request
					.put ('/job/' + job + '/sistema/12')
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerRegistroDeTablaSistema (res, callback) {

				request
					.get ('/job/' + job + '/sistema/12')
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaRegistroDeTablaSistema (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('PAIS', data.PAIS);
				expect(resData).to.have.property('ID', data.ID);
				expect(resData).to.have.property('NOMBRE', data.NOMBRE);
				expect(resData).to.have.property('DESCRIPCION', data.DESCRIPCION);
				callback(null);

			}
		], done);

	});

	it('Modificar un job', function (done) {

		var data = {};

		async.waterfall ([

			function obtenerJob (callback) {

				request
					.get ('/job/' + job)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function modificarJob (res, callback) {

				data = res.body;
				data.proyecto = data.proyecto + ' Modificada';
				data.descripcion = data.descripcion + ' Modificada';
				request
					.put ('/job/' + job)
					.set('Accept', 'applicacion/json')
					.send(data)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end(callback);

			},
			function obtenerJobParaVerificar (res, callback) {

				request
					.get ('/job/' + job)
					.expect(200)
					.expect('Content-Type', /application\/json/)
					.end (callback);

			},
			function verificaJob (res, callback) {

				var resData = res.body;
				expect(resData).to.have.property('job');
				expect(resData).to.have.property('proyecto', data.proyecto);
				expect(resData).to.have.property('descripcion', data.descripcion);
				expect(resData).to.have.property('registros');
				callback(null);

			}
		], done);

	});

	it('Borrar un registros de una tabla del job', function (done) {

		request
			.delete ('/job/' + job + '/sistema/12')
			.expect(200)
			.end (function () {
				done();
			});

	});

	it('Borrar un job', function (done) {

		request
			.delete ('/job/' + job)
			.set('Accept', 'applicacion/json')
			.expect(200)
			.end(function () {
				done();
			});

	});

});
