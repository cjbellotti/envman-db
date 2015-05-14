EnvMan.Views.VerificarJob = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1200"
	},

	initialize : function (config) {

		this.template = swig.compile( $('#verificar-job-template').html() );

		var config = {}
		config.headers = [];
		config.headers.push("Tipo");
		config.headers.push("Descripcion");
		config.headers.push("Accion");
		this.table = MyTable(config);

	},

	events : {

		"click #exportar" : "exportar"

	},

	exportar : function (e) {

		e.preventDefault();
		$.ajax({
			url : '/generar-script',
			method : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(this.datos),
			success : function (data) {
				console.log(data);

				var view = new EnvMan.Views.VerScript();
				$('#modals').append(view.el);
				view.render();
				view.$el.find('#despliegue').html(data.despliegue);
				view.$el.find('#rollback').html(data.rollback);
				view.$el.modal({
					backdrop : 'static',
					keyboard : false
				});
			}

		});

	},

	render : function () {

		// Solo cargo en la tabla los sistemas que NO se encuentren en el Job.

		var self = this;
		window.generales.limpiarRegistros(window.job.registros);
		//$.post('/verificar/' + window.job.job, function (data) {
		$.ajax({
			method : 'POST',
			url : '/verificar', 
			contentType : 'application/json',
			data : JSON.stringify(window.job),
			success: function (data) {

			self.datos = data;

			var arrayData = [];
			for (var tabla in data) {

				for (var index in data[tabla]) {

					var registro = {};
					registro.Tipo = tabla;
					registro.Accion = (data[tabla][index].MOD) ? "Update" : "Insert";
					registro.Descripcion = "";

					for (var field in data[tabla][index]) {
						if (field != "MOD" && field != "IDN" && field != 'origenReg') {
							registro.Descripcion += field + " : " + data[tabla][index][field] + " - ";
						}
					}
					arrayData.push(registro);

				}
			}

			self.table.setArrayData(arrayData);

		//});
		}});

		this.$el.html(this.template());
		this.$el.find('.table-content').append(this.table);

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});