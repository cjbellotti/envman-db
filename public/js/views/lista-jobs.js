EnvMan.Views.ListaJobs = Backbone.View.extend({

	initialize : function () {

		this.template = swig.compile( $('#lista-job-template').html());
		this.listenTo(collections.jobs, 'reset', this.render, this);
	},

	events : {

		"click #agregar" : "agregar",
		"click .link-job" : "mostrarJob"

	},

	agregar : function (e) {

		generales.crearNuevoJob();
		var view = new EnvMan.Views.Job();
		$('#modals').html(view.el);
		view.render(window.job);
		$('#jobScr').modal({
			backdrop : 'static',
			keyboard : false
		});

	},

	mostrarJob : function (e) {

		e.preventDefault();

		var nroJob = e.target.getAttribute('job');
		var jobModel = new EnvMan.Models.Job({ job : nroJob });
		var xhr = jobModel.fetch();

		xhr.done(function(data, err) {

			window.job = data;
						
			var view = new EnvMan.Views.Job();
			$('#modals').html(view.el);
			view.render(window.job);
			$('#jobScr').modal({
				backdrop : 'static',
				keyboard : false
			});

		});

	},

	render : function () {

		var config = {};
		config.headers = [];
		config.headers.push("Job");
		config.headers.push("Proyecto");
		config.headers.push("Descripcion");
		var table = MyTable(config);
		table.setHeight(400);

		var self = this;
		var xhr = collections.jobs.fetch();
		xhr.done(function () {

			var tmpJobArray = collections.jobs.toJSON();

			var arrayData = [];

			for (var index in tmpJobArray) {

				var data = {};
				data.Job = '<a href="#" class="link-job" job="'+ tmpJobArray[index].job +'">' + tmpJobArray[index].job + '</a>';
				data.Proyecto = tmpJobArray[index].proyecto;
				data.Descripcion = tmpJobArray[index].descripcion;
				arrayData.push(data);
			}

			table.setArrayData(arrayData);

			self.$el.html(self.template());
			self.$el.find('.table-container').append(table);

		});
		
	}

});