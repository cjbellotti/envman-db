EnvMan.Views.DropdownButton = Backbone.View.extend({
	
	className : 'btn-group',

	dropdownButtonTemplate : swig.compile( $('#dropdown-button-template').html() ),
	itemTemplate : swig.compile( $('#simple-menu-item-template').html() ),

	initialize : function (label, items) {

		this.label = label;
		this.items = items;

	},

	render : function () {

		this.$el.html( this.dropdownButtonTemplate({ label : this.label }));
		var self = this;
		_.each(this.items, function (item) {

			self.$el.find('.dropdown-menu').append(self.itemTemplate(item));

		});

	},

	disable : function() {
		this.$el.find('.main-btn').addClass('disabled');
		this.$el.find('.toggle-btn').addClass('disabled');
	},

	enable : function () {
		this.$el.find('.main-btn').removeClass('disabled');
		this.$el.find('.toggle-btn').removeClass('disabled');
	}

});