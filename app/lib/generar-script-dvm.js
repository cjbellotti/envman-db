var manageJob = require('../tables/job');
var fs = require('fs');
var _ = require('underscore');

var scriptDespliegueTemplate = fs.readFileSync(__dirname + '/../cfg/templates/general-script-despliegue.sql').toString();

var templateInsert = fs.readFileSync(__dirname + '/../cfg/templates/insert-script-despliegue.sql').toString();
var templateUpdate = fs.readFileSync(__dirname + '/../cfg/templates/update-script-despliegue.sql').toString();

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
				template = template.replace(regExp, datos[dato][field]);

			}
		} 

	}

	return template;

}

function generarInsert(tabla, registro) {

	var script = "";

	var fields = [];
	var values = [];

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

	return procesarTemplate(templateInsert, datos);

}

function generarUpdate(tabla, registro) {

	var script = "";

	var fields = [];
	var values = [];
	var igualdad = [];

	if (registro.IDN) {
		registro.ID = IDN;
	}

	for (var field in registro) {

		if (field != 'IDN' && field != 'MOD') {

			fields.push(field);

			var valor = registro[field];
			if (typeof registro[field] == 'string') {
				valor = "'" + registro[field] + "'";
			}

			values.push(valor);

			igualdad.push(field + ' = ' + valor);

		}

	}

	var datos = {

		TABLA : tabla,
		CAMPOS : fields.join(),
		VALORES : values.join(),
		REGISTRO : registro,
		IGUALDAD : igualdad.join(" and ")

	};

	return procesarTemplate(templateUpdate, datos);

}

function generarScript(nroJob) {

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

	script = procesarTemplate(scriptDespliegueTemplate, data);

	return script;

}

module.exports = generarScript;