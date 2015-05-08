EnvMan.Collections.ValoresCanonicos = Backbone.Collection.extend({

	model : EnvMan.Models.ValorCanonico,

	fetchData : function (objeto) {
		this.url = "/valor-canonico/" + window.job.target;
		this.fetch(objeto);
	}

});