EnvMan.Views.Phasebar = Backbone.View.extend({

	className : 'phase-bar btn-toolbar',

	render : function () {

		this.istButton = new EnvMan.Views.DropdownButton("IST",
			[
				{
					label : 'Fase Siguiente',
					url : 'nextfase'
				}
			]
		);

		this.qamButton = new EnvMan.Views.DropdownButton("QAM",
			[
				{
					label : 'Fase Siguiente',
					url : 'nextfase'
				},
				{
					label : 'Fase Anterior',
					url : 'prevfase'
				}
			]
		);

		this.qapButton = new EnvMan.Views.DropdownButton("QAP",
			[
				{
					label : 'Fase Siguiente',
					url : 'nextfase'
				},
				{
					label : 'Fase Anterior',
					url : 'prevfase'
				}
			]
		);

		this.prodButton = new EnvMan.Views.DropdownButton("Produccion",
			[
				{
					label : 'Fase Anterior',
					url : 'prevfase'
				}
			]
		);

		this.istButton.render();
		this.qamButton.render();
		this.qapButton.render();
		this.prodButton.render();

		this.$el.append(this.istButton.el);
		this.$el.append(this.qamButton.el);
		this.$el.append(this.qapButton.el);
		this.$el.append(this.prodButton.el);

		this.$el.css({
			margin : '0 auto'
		});

		this.istButton.disable();
		this.qamButton.disable();
		this.qapButton.disable();
		this.prodButton.disable();		

	},

	setPhase: function (phase) {

		this.istButton.disable();
		this.qamButton.disable();
		this.qapButton.disable();
		this.prodButton.disable();		

		switch (phase) {
			case 'ist' :
				this.istButton.enable();
				break;
			case 'qam' :
				this.qamButton.enable();
				break;
			case 'qap' :
				this.qapButton.enable();
				break;
			case 'prod' :
				this.prodButton.enable();
				break;
			default :
				break;
		}

	}
});