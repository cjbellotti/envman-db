EnvMan.Collections.Sistemas = Backbone.Collection.extend({

	model : EnvMan.Models.Sistema,

	fetchData : function () {
		this.url = "/sistema/" + window.job.target;
		this.fetch();
	}

});