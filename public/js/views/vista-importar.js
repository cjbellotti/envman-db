EnvMan.Views.ImportarArchivo = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function () {
		this.template = swig.compile( $('#importar-window-template').html());
	},
	
	events : {

		"click #importarArch" : "importar"
	
	},

	importar : function (e) {

		var self = this;
		 		
		var tablas = [];

		var parseString = function (cadena) { return cadena; };

		var sistema = {};
		sistema.fields = [
			{ID : parseInt},
			{PAIS : parseString},
			{NOMBRE : parseString},
			{DESCRIPCION : parseString}
		];
		sistema.nombre = "sistema";
		sistema.model = EnvMan.Models.Sistema;
		sistema.collection = window.collections.sistemas;

		tablas.push(sistema);

		var entidadcanonica = {};
		entidadcanonica.fields = [

			{ID : parseInt},
			{NOMBRE : parseString},
			{DESCRIPCION : parseString}

		];
		entidadcanonica.nombre = "entidadcanonica";
		entidadcanonica.model = EnvMan.Models.Entidad;
		entidadcanonica.collection = window.collections.entidades;

		tablas.push(entidadcanonica);

		var valorcanonico = {};
		valorcanonico.fields = [

			{ID : parseInt},
			{ID_ENTIDAD_CANONICA : parseInt},
			{DESCRIPCION : parseString},
			{VALOR_CANONICO : parseString}

		];
		valorcanonico.nombre = "valorcanonico";
		valorcanonico.model = EnvMan.Models.ValorCanonico;
		valorcanonico.collection = window.collections.valoresCanonicos;

		tablas.push(valorcanonico);

		var valorsistema = {};
		valorsistema.fields = [

			{ID : parseInt},
			{ID_SISTEMA : parseInt},
			{ID_VALOR_CANONICO : parseInt},
			{ID_ENTIDAD_CANONICA : parseInt},
			{VALOR_SISTEMA : parseString}

		];
		valorsistema.nombre = "valorsistema";
		valorsistema.model = EnvMan.Models.ValorSistema;
		valorsistema.collection = window.collections.valoresSistema;

		tablas.push(valorsistema);

		var reader = new FileReader();
		reader.onload = function(e) {
			var rows=e.target.result.split("\n");

			var objeto = {};
			for(var indexRow = 0; indexRow < rows.length-1; indexRow++)
			{

				var columns = rows[indexRow].split(";");
				var tablaIndex=columns[0];
				tablaIndex--;

				objeto = {};
				var index = 0;
				for (var indexField in tablas[tablaIndex].fields) {
					index++;
					for (var field in tablas[tablaIndex].fields[indexField])
						objeto[field] = tablas[tablaIndex].fields[indexField][field](columns[index]);
				}
				window.generales.agregarRegistroAlJob(tablas[tablaIndex].nombre, objeto);
				//var model = new tablas[tablaIndex].model(objeto);
				//tablas[tablaIndex].collection.add(model);

			}

			$.ajax({
				url : '/verificar',
				method : 'POST',
				contentType : 'application/json',
				data : JSON.stringify(window.job),
				success : function (data) {

					window.job.registros = data;

					for (tabla in window.job.registros) {

						var index = _.findIndex(tablas, { nombre : tabla });
						if (index >= 0) {

							for (var indexReg in window.job.registros[tabla]) {

								var registro = window.job.registros[tabla][indexReg];
								if (registro.IDN)
									registro.ID = registro.IDN;

								var model = new tablas[index].model(registro);
								tablas[index].collection.add(model);

							}
						}

					}

					window.generales.limpiarRegistros(window.job.registros);

				}
			});

		}
		reader.readAsText($('#archivo:file')[0].files[0]);
		return false;
	},
	
	render : function () {

		this.$el.html(this.template);
		$(document).on('change', '.btn-file :file', function() {
  			var input = $(this),
      		numFiles = input.get(0).files ? input.get(0).files.length : 1,
      		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  			input.trigger('fileselect', [numFiles, label]);
		});


    	$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        	var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        	if( input.length ) {
           		input.val(log);
        	} else {
            	if( log ) alert(log);
        	}
        
   		 });
	}

});