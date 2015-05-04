EnvMan.Views.Entidad = Backbone.View.extend({

	initialize : function () {

		this.template = swig.compile( $('#entidad-screen-template').html());

	},

	events : {

		"click #aceptar" : "guardar"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('ID');
		if (!id) {

			var id = 1;
			var ultima = window.collections.entidades.last();
			if (ultima) {
				id = ultima.get("ID") + 1;
			}

			this.model.set('ID', id);
			nuevo = true;
		}

		this.model.set('NOMBRE', this.$el.find('#nombre').val());
		this.model.set('DESCRIPCION', this.$el.find('#descripcion').val());

		window.collections.entidades.add(this.model);

		if (nuevo) {
			window.collections.entidades.add(this.model);
			generales.agregarRegistroAlJob("entidadcanonica", this.model.toJSON());
		} else {
			window.collections.entidades.set(this.model, { remove : false });
			generales.modificarRegistroEnJob("entidadcanonica", this.model.toJSON());
		}

		this.$el.remove();

	},

	render : function () {

		var data = {};
		if (this.model) {

			data = this.model.toJSON();

		}

		this.$el.html(this.template(data));

	}

});