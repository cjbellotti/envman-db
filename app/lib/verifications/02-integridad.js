var _ = require('underscore');

function normalizarSistema (registros) {

	if (registros.sistema) {

		for (var index in registros.sistema) {

			var sistema = registros.sistema[index];

			if (sistema.IDN) {

				if (registros.valorsistema) {

					var indexValorSistema = _.findIndex(registros.valorsistema, { "ID_SISTEMA" : sistema.ID});
					if (indexValorSistema >= 0) {

						registros.valorsistema[indexValorSistema]["ID_SISTEMA"] = sistema.IDN;

					}

				}
				
			}

		}

	}

	return registros;

}

function normalizarEntidadCanonica(registros) {

	if (registros.entidadcanonica) {

		for (var index in registros.entidadcanonica) {

			var entidadcanonica = registros.entidadcanonica[index];

			if (entidadcanonica.IDN) {

				if (registros.valorsistema) {

					var indexValorSistema = _.findIndex(registros.valorsistema,
													 { "ID_ENTIDAD_CANONICA" : entidadcanonica.ID});
					if (indexValorSistema >= 0) {

						registros.valorsistema[indexValorSistema]["ID_ENTIDAD_CANONICA"] = entidadcanonica.IDN;

					}

				}

				if (registros.valorcanonico) {

					var indexValorCanonico = _.findIndex(registros.valorcanonico,
													 { "ID_ENTIDAD_CANONICA" : entidadcanonica.ID});
					if (indexValorCanonico >= 0) {

						registros.valorcanonico[indexValorSistema]["ID_ENTIDAD_CANONICA"] = entidadcanonica.IDN;

					}

				}
				
			}

		}

	}

	return registros;
}

module.exports = function (tables, registros) {

	registros = normalizarSistema(registros);
	registros = normalizarEntidadCanonica(registros);

	return registros;

}