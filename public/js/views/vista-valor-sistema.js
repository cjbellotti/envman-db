EnvMan.Views.ValorSistema = Backbone.View.extend({

	initialize : function () {
		this.template = swig.compile( $('#valor-sistema-window-template').html());
	},
	
	events : {

		"click #vs-llamarEntidad" : 		"mostrarVentanaEntidad",
		"click #vs-llamarPais" : 			"mostrarVentanaPais",
		"click #vs-llamarValorEntidad" : 	"mostrarVentanaValorEntidad"
	},

	mostrarVentanaPais : function (e) {

		var view = new EnvMan.Views.Paises();
		var id = 'modal' + Math.floor((Math.random() * 100000000) + 1);
		var tmpDiv = $('<div id="' + id + '"/>');
		tmpDiv.html(view.el);
		view.render();
		view.$el.find('#p-aceptar').on('click', function() {
			tmpDiv.remove();
		});
		view.$el.find('#p-cancelar').on('click', function() {
			tmpDiv.remove();
		});
		$('#modals').append(tmpDiv);
		$('#paisScr').modal('show');
	},

	mostrarVentanaEntidad : function (e) {

		var view = new EnvMan.Views.Entidad();
		var id = 'modal' + Math.floor((Math.random() * 100000000) + 1);
		var tmpDiv = $('<div id="' + id + '"/>');
		tmpDiv.html(view.el);
		view.render();
		view.$el.find('#e-aceptar').on('click', function() {
			tmpDiv.remove();
		});
		view.$el.find('#e-cancelar').on('click', function() {
			tmpDiv.remove();
		});
		$('#modals').append(tmpDiv);
		$('#entidadScr').modal('show');
	},

	mostrarVentanaValorEntidad : function (e) {

		var view = new EnvMan.Views.ValorEntidad();
		var id = 'modal' + Math.floor((Math.random() * 100000000) + 1);
		var tmpDiv = $('<div id="' + id + '"/>');
		tmpDiv.html(view.el);
		view.render();
		view.$el.find('#ve-aceptar').on('click', function() {
			tmpDiv.remove();
		});
		view.$el.find('#ve-cancelar').on('click', function() {
			tmpDiv.remove();
		});
		$('#modals').append(tmpDiv);
		$('#valorEntidadScr').modal('show');
	},

	render : function () {

		this.$el.html(this.template);

	}

});