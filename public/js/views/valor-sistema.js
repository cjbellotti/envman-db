EnvMan.Views.ValorSistema = Backbone.View.extend({

	initialize : function () {

		this.template = swig.compile( $('#valor-sistema-screen-template').html());
		this.listenTo(window.collections.sistemas, 'add', this.renderItemComboSistema);
		this.listenTo(window.collections.entidades, 'add', this.renderItemComboEntidad);
		this.listenTo(window.collections.valoresCanonicos, 'add', this.renderItemComboValorCanonico);

	},

	events : {

		"click #aceptar" : "guardar",
		"click #cancelar" : "cancelar",
		"change #entidad" : "cargarComboValorCanonico"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('ID');
		if (!id) {

			var id = 1;
			var ultima = window.collections.valoresSistema.last();
			if (ultima) {
				id = ultima.get("ID") + 1;
			}

			this.model.set('ID', id);

			nuevo = true;

		}

		this.model.set('ID_SISTEMA', parseInt(this.$el.find('#sistema').val()));
		this.model.set('ID_ENTIDAD_CANONICA', parseInt(this.$el.find('#entidad').val()));
		this.model.set('ID_VALOR_CANONICO', parseInt(this.$el.find('#valor-canonico').val()));
		this.model.set('DESCRIPCION', this.$el.find('#descripcion').val() || "");
		this.model.set('VALOR_SISTEMA', this.$el.find('#valor-sistema').val() || "")

		if (nuevo) {

			window.collections.valoresSistema.add(this.model);
			generales.agregarValorSistemaAJob(this.model.toJSON());

		} else {
			window.collections.valoresSistema.set(this.model, {remove : false});
			generales.modificarValorSistemaEnJob(this.model.toJSON());
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
		window.collections.sistemas.each(function (sistema) {

			self.renderItemComboSistema(sistema);

		});
		window.collections.entidades.each(function (entidad) {

			self.renderItemComboEntidad(entidad);

		});

		if (data['ID_SISTEMA']) {
			this.$el.find('#sistema').val(data['ID_SISTEMA']);
		}

		if (data['ID_ENTIDAD_CANONICA']) {

			this.$el.find('#entidad').val(data['ID_ENTIDAD_CANONICA']);

			if (data['ID_VALOR_CANONICO']) {
			
				this.cargarComboValorCanonico(data['ID_ENTIDAD_CANONICA']);
				this.$el.find('#valor-canonico').val(data['ID_VALOR_CANONICO']);				

			}

		} else {

			var idEntidad = this.$el.find('#entidad').val();

			if (idEntidad > "") {

				this.cargarComboValorCanonico(idEntidad);

			}

		}

	},

	cargarComboValorCanonico : function () {

		var idEntidad = parseInt(this.$el.find('#entidad').val());

		var valores = window.collections.valoresCanonicos.where({

			"ID_ENTIDAD_CANONICA" : idEntidad

		});

		this.$el.find('#valor-canonico').html('');

		var self = this;
		if (valores.length) {

			valores.forEach(function (valorCanonico) {

				self.renderItemComboValorCanonico(valorCanonico);

			});

		}

	},

	renderItemComboSistema : function (sistema) {

		var item = $('<option/>');
		item.attr('value', sistema.get('ID'));
		item.html(sistema.get('NOMBRE'));

		this.$el.find('#sistema').append(item);

	},

	renderItemComboEntidad : function (entidad) {

		var item = $('<option/>');
		item.attr('value', entidad.get('ID'));
		item.html(entidad.get('NOMBRE'));

		this.$el.find('#entidad').append(item);

	},

	renderItemComboValorCanonico : function (valorCanonico) {

		var item = $('<option/>');
		item.attr('value', valorCanonico.get('ID'));
		item.html(valorCanonico.get('VALOR_CANONICO'));

		this.$el.find('#valor-canonico').append(item);

	},

});