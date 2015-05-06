EnvMan.Views.ValorCanonico = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {

		this.template = swig.compile( $('#valor-canonico-screen-template').html());
		this.listenTo(window.collections.entidades, 'add', this.renderItemComboEntidad);

	},

	events : {

		"click #aceptar" : "guardar",
		"click #cancelar" : "cancelar"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('ID');
		if (!id) {

			var id = 1;
			var ultima = window.collections.valoresCanonicos.last();
			if (ultima) {
				id = ultima.get("ID") + 1;
			}

			this.model.set('ID', id);
			nuevo = true;

		}

		this.model.set('ID_ENTIDAD_CANONICA', parseInt(this.$el.find('#entidad').val()));
		this.model.set('VALOR_CANONICO', this.$el.find('#valor-canonico').val());
		this.model.set('DESCRIPCION', this.$el.find('#descripcion').val());

		if (nuevo) {

			window.collections.valoresCanonicos.add(this.model);
			generales.agregarValorCanonicoAJob(this.model.toJSON());

		} else {

			window.collections.valoresCanonicos.set(this.model, { remove : false});
			generales.modificarValorCanonicoEnJob(this.model.toJSON());
		}

	},

	cancelar : function () {


	},

	render : function () {

		var data = {};
		if (this.model) {

			data = this.model.toJSON();

		}

		this.$el.html(this.template(data));

		var self = this;
		window.collections.entidades.each(function (entidad) {

			self.renderItemComboEntidad(entidad);

		});

		if (data['ID_ENTIDAD_CANONICA']) {
			this.$el.find('#entidad').val(data['ID_ENTIDAD_CANONICA']);
		}

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	},

	renderItemComboEntidad : function (entidad) {

		var item = $('<option/>');
		item.attr('value', entidad.get('ID'));
		item.html(entidad.get('NOMBRE'));

		this.$el.find('#entidad').append(item);

	}

});