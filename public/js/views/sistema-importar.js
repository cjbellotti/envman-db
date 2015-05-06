EnvMan.Views.SistemaImportar = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function (config) {

		this.template = swig.compile( $('#sistema-importar-template').html() );

		this.onImportarFunction = config.onImportar || function (env) { console.log("No Implementado.")};
		this.env = config.env;

		var config = {}
		config.headers = [];
		config.headers.push("ID");
		config.headers.push("PAIS");
		config.headers.push("NOMBRE");
		config.headers.push("DESCRIPCION");
		config.selectable = true;
		this.table = MyTable(config);

	},

	events : {

		"click #importar" : "onImportar"

	},

	onImportar : function (e) {

		this.onImportarFunction(this);

	},

	render : function () {

		// Solo cargo en la tabla los sistemas que NO se encuentren en el Job.
		var sistemas = window.collections.sistemas.toJSON();

		var arrayData = [];
		for (var index in sistemas) {
			if (_.findIndex(job.registros.sistema, sistemas[index]) < 0)
				arrayData.push(sistemas[index]);
		}

		this.table.setArrayData(arrayData);

		this.$el.html(this.template());
		this.$el.find('.table-sistema-importar').append(this.table);

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});