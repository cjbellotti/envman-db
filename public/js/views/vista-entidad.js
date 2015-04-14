EnvMan.Views.Entidad = Backbone.View.extend({

	initialize : function () {
		this.template = swig.compile( $('#entidad-window-template').html());
	},
	
	events : {
	
		"click .btn-primary": "guardar",
	},

	guardar : function (e) {
		debugger;
	},
	
	render : function () {

		this.$el.html(this.template({
			paises : [
				{
					nombre : "Argentina",
					valor : "Arg"
				},
				{
					nombre : "Colombia",
					valor : "Col"
				},
				{
					nombre : "Peru",
					valor : "Per"
				}
			]
		}));

	}

});