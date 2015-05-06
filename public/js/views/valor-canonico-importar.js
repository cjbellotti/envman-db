EnvMan.Views.ValorCanonicoImportar = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function (config) {

		this.template = swig.compile( $('#valor-canonico-importar-template').html() );

		this.onImportarFunction = config.onImportar || function (env) { console.log("No Implementado.")};
		this.env = config.env;

		var config = {}
		config.headers = [];
		config.headers.push("ID");
		config.headers.push("ID_ENTIDAD_CANONICA");
		config.headers.push("DESCRIPCION");
		config.headers.push("VALOR_CANONICO");
		config.selectable = true;
		config.processCell = function (field, content) {

			var nombre = content;
			if (field == "ID_ENTIDAD_CANONICA"){

				var entidad = window.collections.entidades.get(content);
				nombre = entidad.get('NOMBRE');

			} 

			return nombre;

		}

		this.table = MyTable(config);

	},

	events : {

		"change #id-entidad" : "onChange",
		"click #importar" : "onImportar"

	},

	onImportar : function (e) {

		this.onImportarFunction(this);

	},

	onChange : function (e){

		var arrayData = [];
		var idEntidad = $("#id-entidad").val();

		var valoresCanonicos = window.collections.valoresCanonicos.toJSON();
		for (var index in valoresCanonicos){
			if(idEntidad==valoresCanonicos[index].ID_ENTIDAD_CANONICA &&
				_.findIndex(job.registros.valorescanonicos, valoresCanonicos[index]) < 0){
				arrayData.push(valoresCanonicos[index]);
			}
		}

		this.table.setArrayData(arrayData);

 
		this.$el.find('.table-valores-canonicos-importar').append(this.table);

	},

	render : function () {

		// Solo cargo en la tabla los sistemas que NO se encuentren en el Job.

		this.$el.html(this.template());
		this.$el.find('.table-valor-canonico-importar').append(this.table);
		var entidades = window.collections.entidades.toJSON();

		this.$el.find('#id-entidad').html('')

		var ind=0;

		for (ind in entidades){
			this.$el.find('#id-entidad').append('<option value="'+entidades[ind].ID+'">'+entidades[ind].NOMBRE+'</option>');
		}

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});