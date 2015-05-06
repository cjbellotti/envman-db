EnvMan.Views.Sistema = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {

		this.template = swig.compile( $('#sistema-screen-template').html());

	},

	events : {

		"click #aceptar" : "guardar"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('ID');
		if (!id) {

			var id = 1;
			var ultima = window.collections.sistemas.last();
			if (ultima) {
				id = ultima.get("ID") + 1;
			}

			this.model.set('ID', id);

			nuevo = true;

		}

		this.model.set('NOMBRE', this.$el.find('#nombre').val());
		this.model.set('DESCRIPCION', this.$el.find('#descripcion').val());
		this.model.set('PAIS', this.$el.find('#pais').val());

		if (nuevo) {

			window.collections.sistemas.add(this.model);
			generales.agregarRegistroAlJob("sistema", this.model.toJSON());

		} else {

			window.collections.sistemas.set(this.model, {remove : false});
			generales.modificarRegistroEnJob("sistema", this.model.toJSON());

		}

	},

	render : function () {

		var data = {};
		if (this.model) {

			data = this.model.toJSON();

		}

		this.$el.html(this.template(data));

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});