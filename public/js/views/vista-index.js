EnvMan.Views.Index = Backbone.View.extend({

	initialize : function () {
	
		this.template = swig.compile( $('#botonera').html() );

	},
	events : {

		"click #mostrarPaises" : 			"mostrarVentanaPaises",
		"click #mostrarEntidad" : 			"mostrarVentanaEntidad",
		"click #mostrarEntidades" : 		"mostrarVentanaEntidades",
		"click #mostrarValorEntidad" : 		"mostrarVentanaValorEntidad",
		"click #mostrarValorSistema" :    	"mostrarVentanaValorSistema",
		"click #mostrarValoresXEntidad" : 	"mostrarVentanaValoresXEntidad",
		"click #mostrarValorPais" : 		"mostrarVentanaValorPais"

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

	mostrarVentanaEntidades : function (e) {

		var view = new EnvMan.Views.Entidades();
		var id = 'modal' + Math.floor((Math.random() * 100000000) + 1);
		var tmpDiv = $('<div id="' + id + '"/>');
		tmpDiv.html(view.el);
		view.render();
		view.$el.find('#es-cancelar').on('click', function() {
			tmpDiv.remove();
		});
		$('#modals').append(tmpDiv);
		$('#entidadesScr').modal('show');
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

	mostrarVentanaValorSistema : function (e) {


		var view = new EnvMan.Views.ValorSistema();
		var id = 'modal' + Math.floor((Math.random() * 100000000) + 1);
		var tmpDiv = $('<div id="' + id + '"/>');
		tmpDiv.html(view.el);
		view.render();
		view.$el.find('#vs-aceptar').on('click', function() {
			tmpDiv.remove();
		});
		view.$el.find('#vs-cancelar').on('click', function() {
			tmpDiv.remove();
		});
		$('#modals').append(tmpDiv);
		$('#valorSistemaScr').modal('show');

	}, 

	mostrarVentanaValoresXEntidad : function (e) {


		var view = new EnvMan.Views.ValoresXEntidad();
		var id = 'modal' + Math.floor((Math.random() * 100000000) + 1);
		var tmpDiv = $('<div id="' + id + '"/>');
		tmpDiv.html(view.el);
		view.render();
		view.$el.find('#vxe-cancelar').on('click', function() {
			tmpDiv.remove();
		});
		$('#modals').append(tmpDiv);
		$('#valoresXEntidadScr').modal('show');

	},

	mostrarVentanaValorPais : function (e) {

		var view = new EnvMan.Views.ValoresPais();
		var id = 'modal' + Math.floor((Math.random() * 100000000) + 1);
		var tmpDiv = $('<div id="' + id + '"/>');
		tmpDiv.html(view.el);
		view.render();
		view.$el.find('#vp-aceptar').on('click', function() {
			tmpDiv.remove();
		});
		view.$el.find('#vp-cancelar').on('click', function() {
			tmpDiv.remove();
		});
		$('#modals').append(tmpDiv);
		$('#valoresPaisScr').modal('show');

	},
	
	render : function(e) {

		this.$el.html(this.template());

	},
});
