EnvMan.Views.Job = Backbone.View.extend({

	initialize : function () {
	
		this.template = swig.compile( $('#job-screen-template').html() );

		var configTable = {};

		configTable.headers = [];
		configTable.headers.push("ID");
		configTable.headers.push("PAIS");
		configTable.headers.push("NOMBRE");
		configTable.headers.push("DESCRIPCION");
		configTable.arrayData = job.registros.sistema;

		configTable.onAgregar = function (env) {

			var view = new EnvMan.Views.Sistema({ model : new EnvMan.Models.Sistema() });
			view.render();
			$('#modals').append(view.el);
			$('#sistema-screen').modal('show');

		};

		configTable.onModificar = function (env) {

			var selected = env.table.getSelectedRows();
			if (selected.length > 0 ) {

				var index = selected[0];
				var data = env.table.getRowArrayData(index);
				var model = new EnvMan.Models.Sistema(data);
				var view = new EnvMan.Views.Sistema({ model : model});
				view.render();
				$('#modals').append(view.el);
				$('#sistema-screen').modal('show');

			}

		}

		this.sistemasTable = new EnvMan.Views.JobTable(configTable);

		configTable = {};

		configTable.headers = [];
		configTable.headers.push("ID");
		configTable.headers.push("NOMBRE");
		configTable.headers.push("DESCRIPCION");
		configTable.arrayData = job.registros.entidadcanonica;

		this.entidadesTable = new EnvMan.Views.JobTable(configTable);

		configTable = {};

		configTable.headers = [];
		configTable.headers.push("ID");
		configTable.headers.push("ID_SISTEMA");
		configTable.headers.push("ID_VALOR_CANONICO");
		configTable.headers.push("ID_ENTIDAD_CANONICA");
		configTable.headers.push("VALOR_SISTEMA");
		configTable.arrayData = job.registros.valorsistema;

		this.valorSistemaTable = new EnvMan.Views.JobTable(configTable);

		configTable = {};

		configTable.headers = [];
		configTable.headers.push("ID");
		configTable.headers.push("ID_ENTIDAD_CANONICA");
		configTable.headers.push("DESCRIPCION");
		configTable.headers.push("VALOR_CANONICO");
		configTable.arrayData = job.registros.valorcanonico;

		this.valorCanonicoTable = new EnvMan.Views.JobTable(configTable);


	},

	events : {
		"click #tabSistemas" : "mostrarTablaSistemas",
		"click #tabEntidades" : "mostrarTablaEntidades",
		"click #tabValoresSistema" : "mostrarTablaValorSistema",
		"click #tabValoresCanonicos" : "mostrarTablaValorCanonico"
	},

	mostrarTablaSistemas : function () {

		this.sistemasTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(this.sistemasTable.el);

	},

	mostrarTablaEntidades : function () {

		this.entidadesTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(this.entidadesTable.el);

	},

	mostrarTablaValorSistema : function (){

		this.valorSistemaTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(this.valorSistemaTable.el);

	},

	mostrarTablaValorCanonico : function () {

		this.valorCanonicoTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(this.valorCanonicoTable.el);

	},

	render : function (job) {

		this.$el.html(this.template(job));
		this.$el.find('#' + job.target + ' button').removeClass('disabled');

	}

});

