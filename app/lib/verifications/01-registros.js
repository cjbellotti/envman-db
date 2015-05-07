var fs = require('fs');

var tablesData = {};
var incrementoID = 0;

var claves = JSON.parse(fs.readFileSync(__dirname + '/../../cfg/claves.json').toString());

/*var claves = {

	entidadcanonica : {
		"NOMBRE" : {}
	},
	sistema : {
		"NOMBRE" : {}
	},
	valorcanonico : {
		"ID_ENTIDAD_CANONICA" : {},
		"DESCRIPCION" : {}
	},
	valorsistema : {
		"ID_SISTEMA" : {},
		"ID_VALOR_CANONICO" : {},
		"ID_ENTIDAD_CANONICA" : {}
	}
}*/

function verificarReg(tabla, reg) {

	var ret = null;

	var query = {};

	var tab = tablesData[tabla];

	// Utilizo para el query todos los campos menos el ID
	for (var field in reg) {

		if (claves[tabla][field]){
			query[field] = reg[field];
		}

	}

	var registro = tab.read(query);
	if (registro == null) {

		// Verifico si el ID esta ocupado
		ret = tab.read({ ID : reg.ID});
		if (ret != null) {
			// Si el ID esta ocupado obtenemos el ultimo y lo incrementamos
			incrementoID++;
			reg.IDN = tab.lastId() + incrementoID;

		}

		ret = reg;

	} else {

		var modificar = false;
		for (var field in registro) {

			if (field != 'ID') {

				if (registro[field] != reg[field]) {

					reg.MOD = true;
					reg.origenReg = registro;
					ret = reg;
					modificar = true;

				}

			}

		}

	}

	return ret;

}

module.exports = function (tables, registros) {

	tablesData = tables;

	var result = {};

	for (var key in registros) {

		incrementoID = 0;
		var tabla = registros[key];
		for (var i in tabla) {

			var reg = verificarReg(key, tabla[i]);

			if (reg != null) {

				if (!result[key])
					result[key] = [];

				result[key].push(reg);

			}

		}

	}

	return result;

}