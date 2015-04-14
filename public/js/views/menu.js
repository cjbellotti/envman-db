EnvMan.Views.Menu = Backbone.View.extend({

	tagName : 'nav',
	className : 'navbar navbar-default navbar-fixed-top',

	menuTemplate : swig.compile( $('#menu-template').html() ),

	simpleMenuItemTemplate : swig.compile( $('#simple-menu-item-template').html() ),

	complexMenuItemTemplate : swig.compile( $('#complex-menu-item-template').html() ),

	menues : 
		[
			{ 
				label : 'Herramientas', 
				url : 'tools',
				items : 
					[
						{
							label : 'Configurar Ambiente',
							url : 'configurar-ambiente'
						},
						{
							label : 'Usuarios',
							url : 'usuarios'
						}
					]
			},
			{ label : 'Cerrar sesion', url : 'logout'}
		],

	render : function () {

		this.$el.html(this.menuTemplate());

		var html = "";
		var self = this;
		var $menu = this.$el.find('.navbar-nav');

		_.each(this.menues, function(item) {

			if (item.items) {

				$menu.append(self.complexMenuItemTemplate(item));

				var $complexMenu = $menu.find('.dropdown-menu');

				_.each(item.items, function (item) {

					$complexMenu.append(self.simpleMenuItemTemplate(item));

				});

			} else {

				$menu.append(self.simpleMenuItemTemplate(item));

			}

		});

	}
});