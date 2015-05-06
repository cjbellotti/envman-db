window.collections.jobs = new EnvMan.Collections.Jobs();
window.collections.sistemas = new EnvMan.Collections.Sistemas();
window.collections.sistemas.comparator = "ID";
window.collections.entidades = new EnvMan.Collections.Entidades();
window.collections.entidades.comparator = "ID";
window.collections.valoresCanonicos = new EnvMan.Collections.ValoresCanonicos();
window.collections.valoresCanonicos.comparator = "ID";
window.collections.valoresSistema = new EnvMan.Collections.ValoresSistema();
window.collections.valoresSistema.comparator = "ID";

window.generales.agregarRegistroAlJob = function(tabla, registro) {

	var ret =  true;
	if (!window.job.registros[tabla]) {
		window.job.registros[tabla] = [];
	}

	var index = _.findIndex(job.registros[tabla], { ID : registro.ID});

	if (index >= 0) {
		var ultimo = _.last(job.registros[tabla]);
		registro.ID = ultimo.ID + 1;
	}

	window.job.registros[tabla].push (registro);

	return ret;

}

window.generales.modificarRegistroEnJob = function(tabla, registro) {

	var ret = false;
	if (!window.job.registros[tabla]) {
		window.job.registros[tabla] = [];
	}

	var index = _.findIndex(job.registros[tabla], { ID : registro.ID});

	if (index >= 0) {
		window.job.registros[tabla][index] = registro;
		ret = true;
	}

	return ret;

}

window.generales.eliminarRegistroDeJob = function(tabla, registro) {

	var ret = false;
	if (window.job.registros[tabla]) {

		var index = _.findIndex(job.registros[tabla], { ID : registro.ID});

		if (index >= 0) {
			//window.job.registros[tabla] = _.without(window.job.registros[tabla], window.job.registros[tabla][index]);
			job.registros[tabla].splice(index,1);
			ret = true;
		}

	}

	return ret;

}

window.generales.obtenerRegistroDeJob = function(tabla, id) {

	var ret = null;
	if (window.job.registros[tabla]) {

		var index = _.findIndex(job.registros[tabla], { ID : id});

		if (index >= 0)
			ret = window.job.registros[tabla][index];

	}

	return ret;

}

window.generales.normalizarSistema = function (id) {

	var sistema = window.generales.obtenerRegistroDeJob("sistema", id);

	if (sistema == null) {

		var modelosistema = window.collections.sistemas.get(id);
		if (modelosistema) {

			var data = modelosistema.toJSON();
			window.generales.agregarRegistroAlJob("sistema", data);

		}

	}

}

window.generales.normalizarEntidadCanonica = function (id) {

	var entidadCanonica = window.generales.obtenerRegistroDeJob("entidadcanonica", id);

	if (entidadCanonica == null) {

		var modeloEntidadCanonica = window.collections.entidades.get(id);
		if (modeloEntidadCanonica) {

			var data = modeloEntidadCanonica.toJSON();
			window.generales.agregarRegistroAlJob("entidadcanonica", data);

		}

	}

}

window.generales.normalizarValorCanonico = function (id) {

	var valorCanonico = window.generales.obtenerRegistroDeJob("valorcanonico", id);

	if (valorCanonico == null) {

		var modeloValorCanonico = window.collections.valoresCanonicos.get(id);
		if (modeloValorCanonico) {

			var data = modeloValorCanonico.toJSON();
			window.generales.agregarRegistroAlJob("valorcanonico", data);

		}

	}

}

window.generales.agregarValorCanonicoAJob = function(registro) {

	window.generales.agregarRegistroAlJob("valorcanonico", registro);

	window.generales.normalizarEntidadCanonica(registro['ID_ENTIDAD_CANONICA']);

}

window.generales.modificarValorCanonicoEnJob = function(registro) {

	window.generales.modificarRegistroEnJob("valorcanonico", registro);

	window.generales.normalizarEntidadCanonica(registro['ID_ENTIDAD_CANONICA']);

}

window.generales.agregarValorSistemaAJob = function(registro) {

	window.generales.agregarRegistroAlJob("valorsistema", registro);

	window.generales.normalizarSistema(registro['ID_SISTEMA']);

	window.generales.normalizarEntidadCanonica(registro['ID_ENTIDAD_CANONICA']);

	window.generales.normalizarValorCanonico(registro['ID_VALOR_CANONICO']);

}

window.generales.modificarValorSistemaEnJob = function(registro) {

	window.generales.modificarRegistroEnJob("valorsistema", registro);

	window.generales.normalizarSistema(registro['ID_SISTEMA']);

	window.generales.normalizarEntidadCanonica(registro['ID_ENTIDAD_CANONICA']);

	window.generales.normalizarValorCanonico(registro['ID_VALOR_CANONICO']);

}

$(function() {
})