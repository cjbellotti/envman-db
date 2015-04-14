EnvMan.Views.Entidades = Backbone.View.extend({

	initialize : function () {
		this.template = swig.compile( $('#entidades-window-template').html());
	},
	
	events : {
	
	},

	render : function () {

		this.$el.html(this.template);

	}

});