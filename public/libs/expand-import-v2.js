function cargarExistentes(tablas, input) {

	for (var index in input) {

		var data = input[index];

		var index = _.findIndex(tablas['DVM_ENTIDAD_CANONICA'].registros,{

			NOMBRE : data.nombreEntidad

		});

		if (index < 0 ) {

			var registro = window.collections.entidades.findWhere({

				NOMBRE : data.nombreEntidad

			});

			if (registro) {

				registro = registro.toJSON();

				tablas['DVM_ENTIDAD_CANONICA'].registros.push(registro);

				idEntidad = registro.ID;

				if (tablas['DVM_ENTIDAD_CANONICA'].id < idEntidad) {

					tablas['DVM_ENTIDAD_CANONICA'].id = idEntidad;

				}

			}

		}

		for (var pais in data.paises) {


			var idSistema = 0;
			var idEntidad = 0;
			var idValorCanonico = 0;
			var idValorSistema = 0;

			index = _.findIndex(tablas['DVM_SISTEMA'].registros, {

				NOMBRE : data.nombreSistema,
				PAIS : pais 
	
			});

			if (index < 0) {
			
				var registro = window.collections.sistemas.findWhere({

					NOMBRE : data.nombreSistema,
					PAIS : pais 

				});

				if (registro) {

					registro = registro.toJSON();

					tablas['DVM_SISTEMA'].registros.push(registro);

					idSistema = registro.ID;

					if (tablas['DVM_SISTEMA'].id < idSistema) {

						tablas['DVM_SISTEMA'].id = idSistema;

					}

				}

			}

			index = _.findIndex(tablas['DVM_VALOR_CANONICO'].registros, {

				ID_ENTIDAD_CANONICA : idEntidad,
				VALOR_CANONICO : data.valorCanonico
 
			});

			if (index < 0) {

				var registro = window.collections.valoresCanonicos.findWhere({

					ID_ENTIDAD_CANONICA : idEntidad,
					VALOR_CANONICO : data.valorCanonico 

				});

				if (registro) {

					registro = registro.toJSON();

					tablas['DVM_VALOR_CANONICO'].registros.push(registro);

					idValorCanonico = registro.ID;

					if (tablas['DVM_VALOR_CANONICO'].id < idValorCanonico) {

						tablas['DVM_VALOR_CANONICO'].id = dValorCanonico;

					}

				}

			}

			index = _.findIndex(tablas['DVM_VALOR_SISTEMA'].registros, {

				ID_ENTIDAD_CANONICA : idEntidad,
				ID_VALOR_CANONICO : idValorCanonico,
				ID_SISTEMA : idSistema,
				VALOR_SISTEMA : data.valorSistema

			});

			if (index < 0) {

				registro = window.collections.valoresSistema.findWhere({

					ID_ENTIDAD_CANONICA : idEntidad,
					ID_VALOR_CANONICO : idValorCanonico,
					ID_SISTEMA : idSistema,
					VALOR_SISTEMA : data.valorSistema

				});


				if (registro) {

					registro = registro.toJSON();

					tablas['DVM_VALOR_SISTEMA'].registros.push(registro);

					idValorSistema = registro.ID;

					if (tablas['DVM_VALOR_SISTEMA'].id < idValorSistema) {

						tablas['DVM_VALOR_SISTEMA'].id = idValorSistema;

					}

				}

			}

		}
		
	}

}

function expandImport(content) {

	var rows = content.split('\n');

	var nombreColumnas = rows[0].split(';');

	var input = [];
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

		var data = {};
		data.nombreSistema = columns[0];
		data.nombreEntidad = columns[1];
		data.valorCanonico = columns[2];
		data.valorSistema = columns[3];
		data.paises = {};

		for (var index = 4; index < columns.length; index++) {

			if (columns[index].trim() == '1') {
				
				data.paises[paises[index-4]] = true;

			}
				
		}

		input.push(data);

	}

	cargarExistentes(tablas, input);

	for (var index in input) {

		var data = input[index];

		for (var pais in data.paises) {

			var sistemaIndex = _.findIndex(tablas['DVM_SISTEMA'].registros, 
											{ 
												NOMBRE : data.nombreSistema,
												PAIS : pais

										 	});
			var idSistema = 0;
			if (sistemaIndex < 0) {

				var registro = {};

				registro.ID = ++tablas['DVM_SISTEMA'].id;
				registro.NOMBRE = data.nombreSistema;
				registro.DESCRIPCION = 'Descripcion de ' + data.nombreSistema;
				registro.PAIS = pais;

				tablas['DVM_SISTEMA'].registros.push(registro);
				idSistema = registro.ID;

			} else {

				idSistema = tablas['DVM_SISTEMA'].registros[sistemaIndex].ID;

			}

			var entidadIndex = _.findIndex(tablas['DVM_ENTIDAD_CANONICA'].registros, 
												{ 
													NOMBRE : data.nombreEntidad 
												});
			var idEntidad = 0;
			if (entidadIndex < 0) {

				var registro = {};

				registro.ID = ++tablas['DVM_ENTIDAD_CANONICA'].id;
				registro.NOMBRE = data.nombreEntidad;
				registro.DESCRIPCION = 'Descripcion de ' + data.nombreEntidad;

				tablas['DVM_ENTIDAD_CANONICA'].registros.push(registro);
				idEntidad = registro.ID;

			} else {

				idEntidad = tablas['DVM_ENTIDAD_CANONICA'].registros[entidadIndex].ID;

			}

			var valorCanonicoIndex = _.findIndex(tablas['DVM_VALOR_CANONICO'].registros, 
												{ 
													ID_ENTIDAD_CANONICA : idEntidad,
													VALOR_CANONICO : data.valorCanonico 
												});
			var idValorCanonico = 0;
			if (valorCanonicoIndex < 0) {

				var registro = {};

				registro.ID = ++tablas['DVM_VALOR_CANONICO'].id;
				registro.ID_ENTIDAD_CANONICA = idEntidad;
				registro.DESCRIPCION = 'Descripcion de ' + data.valorCanonico;
				registro.VALOR_CANONICO = data.valorCanonico;

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
													VALOR_SISTEMA : data.valorSistema
												});
			var idValorSistema = 0;
			if (valorSistemaIndex < 0) {

				var registro = {};
				registro.ID = ++tablas['DVM_VALOR_SISTEMA'].id;
				registro.ID_SISTEMA = idSistema;
				registro.ID_ENTIDAD_CANONICA = idEntidad;
				registro.ID_VALOR_CANONICO = idValorCanonico;
				registro.VALOR_SISTEMA = data.valorSistema;

				tablas['DVM_VALOR_SISTEMA'].registros.push(registro);
				idValorSistema = registro.ID;

			} else {

				idValorSistema = tablas['DVM_VALOR_SISTEMA'].registros[valorSistemaIndex].ID;

			}


		}

	}	
			
	for (var tabla in tablas) {

		output[tabla] = tablas[tabla].registros;

	}

	return output;


}
