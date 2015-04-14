EnvMan.Views.Paises = Backbone.View.extend({

	initialize : function () {
		this.template = swig.compile( $('#paises-window-template').html());
	},

	events : {

	},

	render : function () {

		this.$el.html(this.template);

	}

});