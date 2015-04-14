EnvMan.Views.ValoresPais = Backbone.View.extend({

	initialize : function () {
		this.template = swig.compile( $('#valores-pais-window-template').html());
	},
	
	events : {

		"click #nuevoPais" : 	"mostrarVentanaPaises"
	},

	mostrarVentanaPaises : function (e) {

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

	render : function () {

		this.$el.html(this.template);

	}

});