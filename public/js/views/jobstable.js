EnvMan.Views.JobsTable = Backbone.View.extend({

	tagName : 'div',
	className : 'jobs-table table-responsive',

	jobTableTemplate : swig.compile( $('#jobs-table-template').html() ),

	jobTableItemTemplate : swig.compile( $('#jobs-table-item-template').html() ),

	initialize : function (jobCollections) {

		this.jobs = jobCollections;

		this.jobs.on('add', this.render, this);
		this.jobs.on('reset', this.render, this);

		this.$el.html( this.jobTableTemplate() );		

	},

	render : function () {

		this.$el.html( this.jobTableTemplate() );
		var self = this;
		this.jobs.each(function (job) {

			self.$el.find('.table-body').append( self.jobTableItemTemplate(job.toJSON()));

		});

	},

	renderJob: function (model) {

		this.$el.find('.table-body').append( self.jobTableItemTemplate(job.toJSON()));		

	}

});