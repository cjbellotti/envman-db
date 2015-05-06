function crearTabla(config) {

	var tabla = {};

	var configTable = {};

	configTable.processCell = config.processCell;
	configTable.headers = config.headers;
	configTable.arrayData = config.arrayData;

	configTable.onAgregar = function (env) {

		var view = new config.view({ model : new config.model() });
		view.render();
		$('#modals').append(view.$el);
		view.$el.modal('show');

	};

	configTable.onModificar = function (env) {

		var selected = env.table.getSelectedRows();
		if (selected.length > 0 ) {

			var index = selected[0];
			var data = env.table.getRowArrayData(index);
			var model = new config.model(data);
			var view = new config.view({ model : model});
			view.render();
			$('#modals').append(view.$el);
			view.$el.modal('show');

		}

	}

	configTable.onEliminar = function (env) {

		var selected = env.table.getSelectedRows();
		if (selected.length > 0 ) {

			var index = selected[0];
			var rowData = env.table.getRowArrayData(index);
			var data = {};
			data.titulo = 'Eliminar ' + config.title;
			data.texto = '¿Desea eliminar el registro seleccionado?';
			data.env = this;

			data.onAceptar = function (env) {

				generales.eliminarRegistroDeJob(config.table, rowData);

			}

			var view = new EnvMan.Views.DialogBox(data);
			view.render();
			$('#modals').append(view.$el);
			view.$el.modal('show');

		}

	}

	configTable.onImportar = function (env) {

		var configView = {};
		configView.env = this;
		var self = env;
		configView.onImportar = function (env) {

			var selecteds = env.table.getSelectedRows();
			for (var index in selecteds) {

				var data = env.table.getRowArrayData(selecteds[index]);
				generales.agregarRegistroAlJob(config.table, data);

			}

		}

		var view = new config.viewImport(configView);
		view.render();
		$('#modals').append(view.$el);
		view.$el.modal('show');

	};

	tabla = new EnvMan.Views.JobTable(configTable);

	return tabla;
}