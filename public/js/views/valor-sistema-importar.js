EnvMan.Views.ValorSistemaImportar = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function (config) {

		this.template = swig.compile( $('#valor-sistema-importar-template').html() );

		this.onImportarFunction = config.onImportar || function (env) { console.log("No Implementado.")};
		this.env = config.env;

		var config = {}
		config.headers = [];
		config.headers.push("ID");
		config.headers.push("ID_SISTEMA");
		config.headers.push("ID_ENTIDAD_CANONICA");
		config.headers.push("ID_VALOR_CANONICO");
		config.headers.push("VALOR_SISTEMA")
		config.selectable = true;
		config.processCell = function (field, content) {

			var nombre = content;
			if (field == "ID_ENTIDAD_CANONICA"){

				var entidad = window.collections.entidades.get(content);
				nombre = entidad.get('NOMBRE');

			} else if (field == "ID_SISTEMA") {

				var valorCanonico = window.collections.sistemas.get(content);
				nombre = valorCanonico.get('NOMBRE');

			} else if (field == "ID_VALOR_CANONICO") {

				var valorCanonico = window.collections.valoresCanonicos.get(content);
				nombre = valorCanonico.get('VALOR_CANONICO');

			} 

			return nombre;

		}

		this.table = MyTable(config);

	},

	events : {

		"change #id-entidad" : "onChange",
		"change #id-sistema" : "onChange",
		"click #importar" : "onImportar"

	},

	onImportar : function (e) {

		this.onImportarFunction(this);

	},

	onChange : function (e){

		var arrayData = [];
		var idEntidad = $("#id-entidad").val();
		var idSistema = $("#id-sistema").val();

		var valoresSistema = window.collections.valoresSistema.toJSON();
		for (var index in valoresSistema){
			if(valoresSistema[index].ID_ENTIDAD_CANONICA == idEntidad &&
			   valoresSistema[index].ID_SISTEMA == idSistema &&
			   _.findIndex(job.registros.valorsistema, valoresSistema[index]) < 0){
				arrayData.push(valoresSistema[index]);
			}
		}

		this.table.setArrayData(arrayData);
 
		this.$el.find('.table-valores-canonicos-importar').append(this.table);

	},

	render : function () {

		// Solo cargo en la tabla los sistemas que NO se encuentren en el Job.

		this.$el.html(this.template());
		this.$el.find('.table-valor-sistema-importar').append(this.table);
		var entidades = window.collections.entidades.toJSON();
		var sistemas = window.collections.sistemas.toJSON();

		this.$el.find('#id-entidad').html('')

		var ind=0;

		for (ind in entidades){
			this.$el.find('#id-entidad').append('<option value="'+entidades[ind].ID+'">'+entidades[ind].NOMBRE+'</option>');
		}

		for (ind in sistemas){
			this.$el.find('#id-sistema').append('<option value="'+sistemas[ind].ID+'">'+sistemas[ind].NOMBRE+'</option>');
		}

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});