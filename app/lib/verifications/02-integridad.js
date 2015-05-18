var _ = require('underscore');

function normalizarSistema (registros) {

	if (registros.sistema) {

		for (var index in registros.sistema) {

			var sistema = registros.sistema[index];

			if (sistema.IDN) {

				if (registros.valorsistema) {

					var indexValorSistema = 0;

					do {

						indexValorSistema = _.findIndex(registros.valorsistema, { "ID_SISTEMA" : sistema.ID});
						if (indexValorSistema >= 0) {

							registros.valorsistema[indexValorSistema]["ID_SISTEMA"] = sistema.IDN;

						}

					} while (indexValorSistema >= 0);

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

					var indexValorSistema = 0;

					do {

						indexValorSistema = _.findIndex(registros.valorsistema,
														 { "ID_ENTIDAD_CANONICA" : entidadcanonica.ID});
						if (indexValorSistema >= 0) {

							registros.valorsistema[indexValorSistema]["ID_ENTIDAD_CANONICA"] = entidadcanonica.IDN;

						}

					} while (indexValorSistema >= 0);

				}

				if (registros.valorcanonico) {

					var indexValorCanonico = 0;

					do {

						indexValorCanonico = _.findIndex(registros.valorcanonico,
														 { "ID_ENTIDAD_CANONICA" : entidadcanonica.ID});
						if (indexValorCanonico >= 0) {

							registros.valorcanonico[indexValorCanonico]["ID_ENTIDAD_CANONICA"] = entidadcanonica.IDN;

						}

					} while (indexValorCanonico >= 0);

				}
				
			}

		}

	}

	return registros;
}

function normalizarValorCanonico(registros) {

	if (registros.valorcanonico) {

		for (var index in registros.valorcanonico) {

			var valorcanonico = registros.valorcanonico[index];

			if (valorcanonico.IDN) {

				if (registros.valorsistema) {

					var indexValorSistema = 0;
					do {

						indexValorSistema = _.findIndex(registros.valorsistema,
														 { "ID_VALOR_CANONICO" : valorcanonico.ID});
						if (indexValorSistema >= 0) {

							registros.valorsistema[indexValorSistema]["ID_VALOR_CANONICO"] = valorcanonico.IDN;

						}

					} while (indexValorSistema >= 0);

				}
				
			}

		}

	}

	return registros;
}

module.exports = function (tables, registros) {

	registros = normalizarSistema(registros);
	registros = normalizarEntidadCanonica(registros);
	registros = normalizarValorCanonico(registros);

	return registros;

}