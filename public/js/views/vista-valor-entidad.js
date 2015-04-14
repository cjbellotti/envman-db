EnvMan.Views.ValorEntidad = Backbone.View.extend({

	initialize : function () {
		this.template = swig.compile( $('#valor-entidad-window-template').html());
	},
	
	events : {

		"click #ve-llamarEntidad" : 	"mostrarVentanaEntidad"
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

	render : function () {

		this.$el.html(this.template);

	}

});