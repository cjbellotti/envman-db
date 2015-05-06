EnvMan.Views.DialogBox = Backbone.View.extend({

	className : "modal fade",
	
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function (config) {

		this.templateOkCancel = swig.compile( $('#dialog-ok-cancel-template').html() );

		this.onAceptarFunction = config.onAceptar || function (e) { console.log("No implementado"); };

		this.data = {};
		this.data.titulo = config.titulo;
		this.data.texto = config.texto;
		this.env = config.env;

	},

	events : {

		"click #aceptar" : "onAceptar"

	},

	onAceptar : function (e) {

		this.onAceptarFunction(this.env);

	},

	render : function () {

		this.$el.html(this.templateOkCancel(this.data));

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});