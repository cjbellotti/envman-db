EnvMan.Views.ValoresXEntidad = Backbone.View.extend({

	initialize : function () {
		this.template = swig.compile( $('#valores-xentidad-window-template').html());
	},
	
	events : {


	},

	render : function () {

		this.$el.html(this.template);

	}

});