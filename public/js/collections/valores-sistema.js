EnvMan.Collections.ValoresSistema = Backbone.Collection.extend({

	model : EnvMan.Models.ValorSistema,

	fetchData : function () {
		this.url = "/valor-sistema/" + window.job.target;
		this.fetch();
	}

});