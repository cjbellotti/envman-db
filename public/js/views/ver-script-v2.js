EnvMan.Views.VerScript = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1201"
	},

	initialize : function (data) {

		this.data = data;
		this.template = swig.compile( $('#ver-script-v2-template').html() );

	},

	events : {

		"click #deploy" : "tabDeploy",
		"click #rollback" : "tabRollback"

	},
	
	tabDeploy : function () {

			this.$el.find('#deploy').addClass('active');
			this.$el.find('#rollback').removeClass('active');
			var data = {};
			for (var dc in this.data) {
					data[dc] = {
							script : this.data[dc].despliegue
					}
			}
			var view = new EnvMan.Views.Script(data);
			view.render();
			this.$el.find('.tab-content').html(view.el);

	},

	tabRollback : function () {

			this.$el.find('#deploy').removeClass('active');
			this.$el.find('#rollback').addClass('active');
			var data = {};
			for (var dc in this.data) {
					data[dc] = {
							script : this.data[dc].rollback
					}
			}
			var view = new EnvMan.Views.Script(data);
			view.render();
			this.$el.find('.tab-content').html(view.el);
	},

	render : function () {

		this.$el.html(this.template());

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

		this.tabDeploy(); 

	}

});
