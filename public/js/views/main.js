EnvMan.Views.Main = Backbone.View.extend({

	initialize : function () {

		//window.collections.jobs.fetch();

	},

	render : function () {

		window.views.menu.render();
		$('#menu').html(window.views.menu.el);
		$('#main').html(window.views.jobstable.el);
		
	}
});