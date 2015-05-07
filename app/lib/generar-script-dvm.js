var manageJob = require('../tables/job');
var fs = require('fs');
var _ = require('underscore');

var scriptDespliegueTemplate = fs.readFileSync(__dirname + '/../cfg/templates/general-body-script-despliegue.sql').toString();

var templateInsert = fs.readFileSync(__dirname + '/../cfg/templates/general-insert-script-despliegue.sql').toString();
var templateUpdate = fs.readFileSync(__dirname + '/../cfg/templates/general-update-script-despliegue.sql').toString();
var claves = JSON.parse(fs.readFileSync('./app/cfg/claves.json'));

var DATOS = {};

var templateDir = __dirname + '/../cfg/templates';
var templates = {};
fs.readdir(templateDir, function (err, files) {

	if (err) throw err;

	console.log('Templates:');
	files.forEach(function (file) {
		if(file.indexOf('.sql') > 0) {

			console.log('\t - ' + file);

			var segmentosNombreArchivo = file.split('-');
			var tabla = segmentosNombreArchivo[0];
			var accion = segmentosNombreArchivo[1];

			if (!templates[tabla])
				templates[tabla] = {};
			templates[tabla][accion] = fs.readFileSync(templateDir + '/' + file).toString();

		}

	});

});

var funciones = {};
fs.readdir(__dirname + '/functions', function (err, files) {

	if (err) throw err;

	console.log('Funciones:');
	files.forEach(function (file) {
		if(file.indexOf('.js') > 0) {

			console.log('\t - ' + file);

			var segmentosNombreArchivo = file.split('.');
			var funcion = segmentosNombreArchivo[0];

			funciones[funcion] = require('./functions/' + file);

		}

	});

});

function normalizarNombreTablas(job) {


	var jobTemp = _.clone(job);
	jobTemp.registros = _.clone(job.registros);

	if (jobTemp.registros.sistema) {

		jobTemp.registros.DVM_SISTEMA = [];
		for (var index in jobTemp.registros.sistema) {
			jobTemp.registros.DVM_SISTEMA.push(jobTemp.registros.sistema[index]);
		}
		delete jobTemp.registros['sistema'];

	}

	if (jobTemp.registros.entidadcanonica) {

		jobTemp.registros.DVM_ENTIDAD_CANONICA = [];
		for (var index in jobTemp.registros.entidadcanonica) {
			jobTemp.registros.DVM_ENTIDAD_CANONICA.push(jobTemp.registros.entidadcanonica[index]);
		}
		delete jobTemp.registros['entidadcanonica'];

	}

	if (jobTemp.registros.valorcanonico) {

		jobTemp.registros.DVM_VALOR_CANONICO = [];
		for (var index in jobTemp.registros.valorcanonico) {
			jobTemp.registros.DVM_VALOR_CANONICO.push(jobTemp.registros.valorcanonico[index]);
		}
		delete jobTemp.registros['valorcanonico'];

	}

	if (jobTemp.registros.valorsistema) {

		jobTemp.registros.DVM_VALOR_SISTEMA = [];
		for (var index in jobTemp.registros.valorsistema) {
			jobTemp.registros.DVM_VALOR_SISTEMA.push(jobTemp.registros.valorsistema[index]);
		}
		delete jobTemp.registros['valorsistema'];

	}

	return jobTemp;

}

function procesarTemplate(template, datos) {

	for (var dato in datos) {

		if (dato != "REGISTRO") {

			regExp = new RegExp("\\{\\{\\s\\%" + dato + "\\%\\s\\}\\}", "g");
			template = template.replace(regExp, datos[dato]);

		} else if (dato == "REGISTRO") {
			for (var field in datos[dato]) {

				regExp = new RegExp("\\{\\{\\s\\%" + field + "\\%\\s\\}\\}", "g");
				var comilla = (typeof datos[dato][field] == 'string') ? "'" : "";
				template = template.replace(regExp, comilla + datos[dato][field] + comilla);

			}
		} else if (dato == "ORIGEN") {

			for (var field in datos[dato]) {

				regExp = new RegExp("\\{\\{\\s\\%ORIGEN." + field + "\\%\\s\\}\\}", "g");
				var comilla = (typeof datos[dato][field] == 'string') ? "'" : "";
				template = template.replace(regExp, comilla + datos[dato][field] + comilla);

			}

		}

	}

	return template;

}

function generarInsert(tabla, registro) {

	var script = "";

	var fields = [];
	var values = [];

	if (registro.IDN) {
		registro.ID = registro.IDN;
	}

	for (var field in registro) {

		if (field != 'IDN' && field != 'MOD') {

			fields.push(field);

			var valor = registro[field];
			if (typeof registro[field] == 'string') {
				valor = "'" + registro[field] + "'";
			}

			values.push(valor);

		}

	}

	var datos = {

		TABLA : tabla,
		CAMPOS : fields.join(),
		VALORES : values.join(),
		REGISTRO : registro

	};

	var templateInsert = "";
	if (templates[tabla]){
		if (templates[tabla].insert)
			templateInsert = templates[tabla].insert;
		else
			templateInsert = templates.general.insert;	
	} else
		templateInsert = templates.general.insert;

	return procesarTemplate(templateInsert, datos);

}

function generarUpdate(tabla, registro) {

	var script = "";

	var fields = [];
	var values = [];
	var igualdad = [];

	if (registro.IDN) {
		registro.ID = registro.IDN;
	}

	for (var field in registro) {

		if (field != 'ID' && field != 'IDN' && 
			field != 'MOD' && field != 'origenReg') {

			fields.push(field);

			var valor = registro[field];
			var valorOrigen = "";
			if (registro.origenReg)
				valorOrigen = registro.origenReg[field];

			if (typeof registro[field] == 'string') {
				valor = "'" + registro[field] + "'";
				if (registro.origenReg)
					valorOrigen = "'" + registro.origenReg[field] + "'";
			}

			if (!claves[tabla][field])
				values.push(field + ' = ' + valor);

			if (claves[tabla][field])
				igualdad.push(field + ' = ' + valorOrigen);

		}

	}

	var datos = {

		TABLA : tabla,
		CAMPOS : fields.join(),
		VALORES : values.join(),
		REGISTRO : registro,
		IGUALDAD : igualdad.join(" and ")

	};

	var templateUpdate = "";
	if (templates[tabla]) {
		if (templates[tabla].update)
			templateUpdate = templates[tabla].update;
		else
			templateUpdate = templates.general.update;
	} else
		templateUpdate = templates.general.update;

	return procesarTemplate(templateUpdate, datos);

}

function generarRollback(tabla, registro) {

	var accion = "";
	var script = "";

	var fields = [];
	var values = [];
	var igualdad = [];

	if (registro.IDN) {
		registro.ID = registro.IDN;
		accion = "delete";
	} else if (registro.MOD) {
		accion = "update";
	}

	for (var field in registro) {

		if (field != 'ID' && field != 'IDN' && 
			field != 'MOD' && field != 'origenReg') {

			fields.push(field);

			var valor = registro[field];
			var valorOrigen = "";
			if (registro.origenReg)
				valorOrigen = registro.origenReg[field];
			if (typeof registro[field] == 'string') {
				valor = "'" + registro[field] + "'";
				if (registro.origenReg)
					valorOrigen = "'" + registro.origenReg[field] + "'";
			}

			if (!claves[tabla][field])
				values.push(field + ' = ' + valor);

			if (claves[tabla][field])
				igualdad.push(field + ' = ' + valorOrigen);

		}

	}

	var datos = {

		TABLA : tabla,
		CAMPOS : fields.join(),
		VALORES : values.join(),
		REGISTRO : registro,
		IGUALDAD : igualdad.join(" and "),
		ORIGEN : registro.origenReg

	};

	var template = "";
	if (templates[tabla]) {
		if (templates[tabla][accion])
			template = templates[tabla][accion];
		else
			template = templates.general[accion];
	} else
		template = templates.general[accion];

	return procesarTemplate(template, datos);

}

function procesarFunciones (script) {

	for (var funcion in funciones) {

		var regExpBusquedaFuncion = "\\{\\{\\s\\%" + funcion + "\\((.*?)\\)\\%\\s\\}\\}";
		var busquedaFuncion = RegExp(regExpBusquedaFuncion, 'g');

		var match = busquedaFuncion.exec(script);
		while (match != null) {

			var reemplazo = match[0];
			var params = match[1].split(',');
			var resultado = funciones[funcion](DATOS, script, params);
			script = script.replace(reemplazo, resultado);

			match = busquedaFuncion.exec(script);

		}

	}

	return script;

}
function procesarCondiciones (script) {

	var condicion = /\{\{\s\%.*\((.*?)\).*\?(.*?)\:(.*?)\%\s\}\}/g;

	var match = condicion.exec(script);
	while(match != null) {

		var expresion = match[1];
		var verdadero = match[2];
		var falso = match[3];

		var busqueda = RegExp(expresion, 'g');

		var reemplazo = match[0];
		if (script.indexOf(busqueda) >= 0) {

			script = script.replace(reemplazo, verdadero);

		} else {

			script = script.replace(reemplazo, falso);

		}

		match = condicion.exec(script);
	}

	return script;

}

function procesarDatosGenerales(script) {

	for (var dato in DATOS) {

		var reemplazo = "\\{\\{\\s\\%" + dato + "\\%\\s\\}\\}";
		var regExpReemplazo = RegExp(reemplazo, 'g');
		script = script.replace(regExpReemplazo, DATOS[dato]);

	}

	return script;

}

function generarScript(nroJob) {

	DATOS = {

		DECLARACIONES : ""

	};

	var script = "";

	var job = {};

	if (_.isObject(nroJob)) {

		job.registros = nroJob;

	} else {

		job = manageJob.getJob(nroJob);

	}

	job = normalizarNombreTablas(job);

	if (job) {

		for (var tabla in job.registros) {

			for (var registro in job.registros[tabla]) {

				if (job.registros[tabla][registro].MOD == undefined)
					script += generarInsert(tabla, job.registros[tabla][registro]) + "\n";
				else
					script += generarUpdate(tabla, job.registros[tabla][registro]) + "\n";

			}

		}

	}

	var data = {
		ACCIONES : script
	};

	var scriptDespliegueTemplate = "";
	if (templates[tabla]) {
		if (templates[tabla].body)
			scriptDespliegueTemplate = templates[tabla].body;
		else
			scriptDespliegueTemplate = templates.general.body;	
	} else
		scriptDespliegueTemplate = templates.general.body;

	script = procesarTemplate(scriptDespliegueTemplate, data);

	script = procesarFunciones(script);
	script = procesarDatosGenerales(script);
	script = procesarCondiciones(script);

	return script;

}

module.exports = generarScript;