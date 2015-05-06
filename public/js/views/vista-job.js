EnvMan.Views.Job = Backbone.View.extend({

	initialize : function () {
	
		this.template = swig.compile( $('#job-screen-template').html() );

	},

	events : {
		"click #tabSistemas" : "mostrarTablaSistemas",
		"click #tabEntidades" : "mostrarTablaEntidades",
		"click #tabValoresSistema" : "mostrarTablaValorSistema",
		"click #tabValoresCanonicos" : "mostrarTablaValorCanonico",
		"click #aceptar" : "guardar"
	},

	mostrarTablaSistemas : function (e) {

		var configTable = {};
		configTable.headers = [];
		configTable.headers.push("ID");
		configTable.headers.push("PAIS");
		configTable.headers.push("NOMBRE");
		configTable.headers.push("DESCRIPCION");
		configTable.arrayData = job.registros.sistema;
		configTable.title = "Sistema";
		configTable.table = "sistema";
		configTable.model = EnvMan.Models.Sistema;
		configTable.view = EnvMan.Views.Sistema;
		configTable.viewImport = EnvMan.Views.SistemaImportar;

		var sistemasTable = crearTabla(configTable);

		sistemasTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(sistemasTable.$el);

	},

	mostrarTablaEntidades : function (e) {

		var configTable = {};

		configTable.headers = [];
		configTable.headers.push("ID");
		configTable.headers.push("NOMBRE");
		configTable.headers.push("DESCRIPCION");
		configTable.arrayData = job.registros.entidadcanonica;
		configTable.title = "Entidad Canonica";
		configTable.table = "entidadcanonica";
		configTable.model = EnvMan.Models.Entidad;
		configTable.view = EnvMan.Views.Entidad;
		configTable.viewImport = EnvMan.Views.EntidadImportar;

		var entidadesTable = crearTabla(configTable);

		entidadesTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(entidadesTable.$el);

	},

	mostrarTablaValorSistema : function (e) {

		var configTable = {};

		configTable.headers = [];
		configTable.headers.push("ID");
		configTable.headers.push("ID_SISTEMA");
		configTable.headers.push("ID_VALOR_CANONICO");
		configTable.headers.push("ID_ENTIDAD_CANONICA");
		configTable.headers.push("VALOR_SISTEMA");
		configTable.arrayData = job.registros.valorsistema;
		configTable.title = "Valor Sistema";
		configTable.table = "valorsistema";
		configTable.model = EnvMan.Models.ValorSistema;
		configTable.view = EnvMan.Views.ValorSistema;
		configTable.viewImport = EnvMan.Views.ValorSistemaImportar;
		configTable.processCell = function (field, content) {

			var nombre = content;
			if (field == "ID_ENTIDAD_CANONICA"){

				var entidad = window.collections.entidades.get(content);
				nombre = entidad.get('NOMBRE');

			} else if (field == "ID_SISTEMA") {

				var sistema = window.collections.sistemas.get(content);
				nombre = sistema.get('NOMBRE');

			}

			return nombre;

		}

		var valorSistemaTable = new crearTabla(configTable);

		valorSistemaTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(valorSistemaTable.$el);

	},

	mostrarTablaValorCanonico : function (e) {

		var configTable = {};

		configTable.headers = [];
		configTable.headers.push("ID");
		configTable.headers.push("ID_ENTIDAD_CANONICA");
		configTable.headers.push("DESCRIPCION");
		configTable.headers.push("VALOR_CANONICO");
		configTable.arrayData = job.registros.valorcanonico;
		configTable.title = "Valor Canonico";
		configTable.table = "valorcanonico";
		configTable.model = EnvMan.Models.ValorCanonico;
		configTable.view = EnvMan.Views.ValorCanonico;
		configTable.viewImport = EnvMan.Views.ValorCanonico;
		configTable.processCell = function (field, content) {

			var nombre = content;
			if (field == "ID_ENTIDAD_CANONICA"){

				var entidad = window.collections.entidades.get(content);
				nombre = entidad.get('NOMBRE');

			}

			return nombre;

		}

		var valorCanonicoTable = new crearTabla(configTable);

		valorCanonicoTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(valorCanonicoTable.el);

	},

	guardar : function (e) {

		var jobModel = new EnvMan.Models.Job(window.job);
		jobModel.save();

	},

	render : function (job) {

		this.$el.html(this.template(job));
		this.$el.find('#' + job.target + ' button').removeClass('disabled');

	}

});

