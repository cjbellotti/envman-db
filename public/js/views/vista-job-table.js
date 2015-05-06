EnvMan.Views.JobTable = Backbone.View.extend({

	tagName : 'div',
	className : 'jobs-table table-responsive',

	initialize : function (config) {

		this.jobTableTemplate = swig.compile( $('#job-table-template').html() );

		var configTable = {};
		configTable.headers = config.headers;
		configTable.processCell = config.processCell;
		configTable.selectable = true;
		this.table = MyTable(configTable);
		this.table.setHeight(150);

		var funcionDefault = function (e) {
			e.preventDefault();
			console.log("No implementado.")
		}

		this.onAgregarFunction = config.onAgregar || function() {console.log("No implementado.")};
		this.onModificarFunction = config.onModificar || function() {console.log("No implementado.")};
		this.onEliminarFunction = config.onEliminar || function() {console.log("No implementado.")};
		this.onImportarFunction = config.onImportar || function() {console.log("No implementado.")};

		this.arrayData = config.arrayData;

	},

	events : {

		"click #btn-agregar" : "onAgregar",
		"click #btn-modificar" : "onModificar",
		"click #btn-eliminar" : "onEliminar",
		"click #btn-importar" : "onImportar"

	},

	onAgregar : function (e) {

		console.log('Agregar');

		e.preventDefault();
		this.onAgregarFunction(this);

	},

	onModificar : function (e) {

		console.log('Modificar');

		e.preventDefault();
		this.onModificarFunction(this);

	},

	onEliminar : function (e) {

		console.log('Eliminar');

		e.preventDefault();
		this.onEliminarFunction(this);

	},

	onImportar : function (e) {

		console.log('Importar');
		
		e.preventDefault();
		this.onImportarFunction(this);

	},

	render : function () {

		this.$el.html(this.jobTableTemplate());
		this.$el.find('.table-container').append(this.table);

		this.table.reset();

		this.table.setArrayData(this.arrayData);

	},

});