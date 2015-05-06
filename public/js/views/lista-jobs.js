EnvMan.Views.ListaJobs = Backbone.View.extend({

	initialize : function () {

		this.template = swig.compile( $('#lista-job-template').html());

	},

	events : {

		"click #agregar" : "agregar"

	},

	render : function () {

		this.$el.html(this.template());
		
	}

});