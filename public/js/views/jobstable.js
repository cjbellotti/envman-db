EnvMan.Views.JobTable = Backbone.View.extend({

	tagName : 'div',
	className : 'jobs-table table-responsive',

	initialize : function (config) {

		this.jobTableTemplate = swig.compile( $('#jobs-table-template').html() );

		var configTable = {};
		configTable.headers = config.headers;

		configTable.selectable = true;
		this.table = MyTable(configTable);
		this.table.setHeight(150);

		this.onAgregar = config.onAgregar || function() {console.log("No implementado.")};
		this.onModificar = config.onModificar || function() {console.log("No implementado.")};
		this.onEliminar = config.onEliminar || function() {console.log("No implementado.")};
		this.onImportar = config.onImportar || function() {console.log("No implementado.")};

		this.arrayData = config.arrayData;

	},

	events : {

		"click #btn-agregar" : "onAgregar",
		"click #btn-modificar" : "onModificar",
		"click #btn-eliminar" : "onEliminar",
		"click #btn-importar" : "onImportar"

	}

	render : function () {

		this.$el.html(this.jobTableTemplate());
		this.$el.find('table-container').append(this.table);

		this.table.reset();

		this.table.setArrayData(this.arrayData);

	},

});