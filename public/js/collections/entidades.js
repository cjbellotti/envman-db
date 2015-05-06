EnvMan.Collections.Entidades = Backbone.Collection.extend({

	model : EnvMan.Models.Entidad,

	fetchData : function () {
		this.url = "/entidad-canonica/" + window.job.target;
		this.fetch();
	}

});