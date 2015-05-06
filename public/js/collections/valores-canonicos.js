EnvMan.Collections.ValoresCanonicos = Backbone.Collection.extend({

	model : EnvMan.Models.ValorCanonico,

	fetchData : function () {
		this.url = "/valor-canonico/" + window.job.target;
		this.fetch();
	}

});