EnvMan.Models.Job = Backbone.Model.extend({

	idAttribute : 'job',

	url : function () {

		var url = "/job";
		var nroJob = this.get('job');
		if (nroJob) {
			url += '/' + nroJob; 
		}

		return url;

	}

});