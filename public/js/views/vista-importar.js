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
		 		
		var tablas = {};

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
		sistema.agregar = function (registro) {

			window.generales.agregarRegistroAlJob('sistema', registro);

		};

		tablas['DVM_SISTEMA'] = sistema;

		var entidadcanonica = {};
		entidadcanonica.fields = [

			{ID : parseInt},
			{NOMBRE : parseString},
			{DESCRIPCION : parseString}

		];
		entidadcanonica.nombre = "entidadcanonica";
		entidadcanonica.model = EnvMan.Models.Entidad;
		entidadcanonica.collection = window.collections.entidades;
		entidadcanonica.agregar = function (registro) {

			window.generales.agregarRegistroAlJob('entidadcanonica', registro);
			
		};

		tablas['DVM_ENTIDAD_CANONICA'] = entidadcanonica;

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
		valorcanonico.agregar = window.generales.agregarValorCanonicoAJob;

		tablas['DVM_VALOR_CANONICO'] = valorcanonico;

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
		valorsistema.agregar = window.generales.agregarValorSistemaAJob;

		tablas['DVM_VALOR_SISTEMA'] = valorsistema;

		var reader = new FileReader();
		reader.onload = function(e) {
			var rows=e.target.result.split("\n");

			var data = expandImport(e.target.result);

			for (var tabla in data) {

				for (var index in data[tabla]) {

					tablas[tabla].agregar(data[tabla][index]);
					var model = new tablas[tabla].model(data[tabla][index]);
					tablas[tabla].collection.set(model, { remove : false });

				}
				
			}

			/*$.ajax({
				url : '/verificar',
				method : 'POST',
				contentType : 'application/json',
				data : JSON.stringify(window.job),
				success : function (data) {

					window.job.registros = data;

					for (tabla in window.job.registros) {

						var nombreTabla = window.generales.normalizarNombreTabla(tabla);

						if (tablas[nombreTabla]) {

							for (var indexReg in window.job.registros[tabla]) {

								var registro = window.job.registros[tabla][indexReg];
								if (registro.IDN)
									registro.ID = registro.IDN;

								var model = new tablas[nombreTabla].model(registro);
								tablas[nombreTabla].collection.add(model);

							}
						}

					}

					window.generales.limpiarRegistros(window.job.registros);

				}
			});*/

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
