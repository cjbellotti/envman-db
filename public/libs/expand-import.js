function expandImport(content) {

	var rows = content.split('\n');

	var nombreColumnas = rows[0].split(';');

	var output = {};
	var tablas = {};
	var paises = [];

	for (var index = 0 ; index < 4; index++) {

		var nombreTabla = nombreColumnas[index].split('.')[0];
		tablas[nombreTabla] = {
			id : 0,
			registros: []
		};

	}

	for (var index = 4; index < nombreColumnas.length; index++) {

		paises.push(nombreColumnas[index]);

	}

	for (var rowIndex = 1; rowIndex < rows.length; rowIndex++) {

		var row = rows[rowIndex];

		columns = row.split(';');

		var nombreSistema = columns[0];
		var nombreEntidad = columns[1];
		var valorCanonico = columns[2];
		var valorSistema = columns[3];

		for (var index = 4; index < columns.length; index++) {

			if (columns[index].trim() == '1') {

				var pais = paises[index - 4];
				var sistemaIndex = _.findIndex(tablas['DVM_SISTEMA'].registros, 
												{ 
													NOMBRE : nombreSistema,
													PAIS : pais

											 	});
				var idSistema = 0;
				if (sistemaIndex < 0) {

					var sistemaExistente = window.collections.sistemas.findWhere({

						NOMBRE : nombreSistema,
						PAIS : pais

					});

					// TODO : Si existe el sistema en las collecciones utilizar el existente

					var registro = {};

					if (sistemaExistente) {

						registro = sistemaExistente.toJSON();
						if (registro.ID > tablas['DVM_SISTEMA'].id)
							tablas['DVM_SISTEMA'].id = registro.ID;

					} else {

						registro.ID = ++tablas['DVM_SISTEMA'].id;
						registro.NOMBRE = nombreSistema;
						registro.DESCRIPCION = 'Descripcion de ' + nombreSistema;
						registro.PAIS = pais;

					}
					tablas['DVM_SISTEMA'].registros.push(registro);
					idSistema = registro.ID;

				} else {

					idSistema = tablas['DVM_SISTEMA'].registros[sistemaIndex].ID;

				}

				var entidadIndex = _.findIndex(tablas['DVM_ENTIDAD_CANONICA'].registros, { NOMBRE : nombreEntidad });
				var idEntidad = 0;
				if (entidadIndex < 0) {

					var entidadExistente = window.collections.entidades.findWhere({
						NOMBRE : nombreEntidad
					});

					var registro = {};

					// TODO : Si existe la entidad en las collecciones utilizar la existente
					if (entidadExistente) {

						registro = entidadExistente.toJSON();
						if (registro.ID > tablas['DVM_ENTIDAD_CANONICA'].id)
							tablas['DVM_ENTIDAD_CANONICA'].id = registro.ID;						

					} else {

						registro.ID = ++tablas['DVM_ENTIDAD_CANONICA'].id;
						registro.NOMBRE = nombreEntidad;
						registro.DESCRIPCION = 'Descripcion de ' + nombreEntidad;

					}

					tablas['DVM_ENTIDAD_CANONICA'].registros.push(registro);
					idEntidad = registro.ID;

				} else {

					idEntidad = tablas['DVM_ENTIDAD_CANONICA'].registros[entidadIndex].ID;

				}

				var valorCanonicoIndex = _.findIndex(tablas['DVM_VALOR_CANONICO'].registros, 
													{ 
														ID_ENTIDAD_CANONICA : idEntidad,
														VALOR_CANONICO : valorCanonico 
													});
				var idValorCanonico = 0;
				if (valorCanonicoIndex < 0) {

					var valorCanonicoExistente = window.collections.valoresCanonicos.findWhere({

						ID_ENTIDAD_CANONICA : idEntidad,
						VALOR_CANONICO : valorCanonico 

					});

					var registro = {};

					if (valorCanonicoExistente) {

						registro = valorCanonicoExistente.toJON();
						if (registro.id > tablas['DVM_VALOR_CANONICO'].id)
							tablas['DVM_VALOR_CANONICO'].id = registro.ID;

					} else {

						registro.ID = ++tablas['DVM_VALOR_CANONICO'].id;
						registro.ID_ENTIDAD_CANONICA = idEntidad;
						registro.DESCRIPCION = 'Descripcion de ' + valorCanonico;
						registro.VALOR_CANONICO = valorCanonico;

					}
					tablas['DVM_VALOR_CANONICO'].registros.push(registro);
					idValorCanonico = registro.ID;

				} else {

					idValorCanonico = tablas['DVM_VALOR_CANONICO'].registros[valorCanonicoIndex].ID;

				}

				var valorSistemaIndex = _.findIndex(tablas['DVM_VALOR_SISTEMA'].registros, 
													{
														ID_ENTIDAD_CANONICA : idEntidad,
														ID_VALOR_CANONICO : idValorCanonico,
														ID_SISTEMA : idSistema,
														VALOR_SISTEMA : valorSistema
													});
				var idValorSistema = 0;
				if (valorSistemaIndex < 0) {

					var valorSistemaExistente = window.collections.valoresSistema.findWhere({

						ID_ENTIDAD_CANONICA : idEntidad,
						ID_VALOR_CANONICO : idValorCanonico,
						ID_SISTEMA : idSistema,
						VALOR_SISTEMA : valorSistema

					});

					if (valorSistemaExistente) {

						registro = valorSistemaExistente.toJSON();
						if (registro.ID > tablas['DVM_VALOR_SISTEMA'].id)
							tablas['DVM_VALOR_SISTEMA'].id = registro.ID;

					} else {

						var registro = {};
						registro.ID = ++tablas['DVM_VALOR_SISTEMA'].id;
						registro.ID_SISTEMA = idSistema;
						registro.ID_ENTIDAD_CANONICA = idEntidad;
						registro.ID_VALOR_CANONICO = idValorCanonico;
						registro.VALOR_SISTEMA = valorSistema;

					}
					tablas['DVM_VALOR_SISTEMA'].registros.push(registro);
					idValorSistema = registro.ID;

				} else {

					idValorSistema = tablas['DVM_VALOR_SISTEMA'].registros[valorSistemaIndex].ID;

				}


			}

		}	
			
	}

	for (var tabla in tablas) {

		output[tabla] = tablas[tabla].registros;

	}

	return output;


}