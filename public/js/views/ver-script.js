EnvMan.Views.VerScript = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1201"
	},

	initialize : function (config) {

		this.template = swig.compile( $('#ver-script-template').html() );

	},

	render : function () {

		this.$el.html(this.template());

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});