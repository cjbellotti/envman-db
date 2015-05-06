EnvMan.Collections.ValoresCanonicos = Backbone.Collection.extend({

	model : EnvMan.Models.ValoreCanonico,

	fetchData : function () {
		this.url = "/valor-canonico/" + window.job.target;
		this.fetch();
	}

});