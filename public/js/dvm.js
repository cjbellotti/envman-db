// DVM

function removeDVM ($table) {

	var selected = $table.bootstrapTable('getSelections');

	var toRemove = $.map(selected, function(row) {
		return row.index;
	});

	$table.bootstrapTable('remove', {

		indexes : toRemove

	});

}

function agregarDVM($element) {	

	$valorSistemaScreen.find('#v-s-button-aceptar').unbind('click');
	$valorSistemaScreen.find('#v-s-button-aceptar').click(function (e) {

		var pais = $('#v-s-pais').val();
		var entidad = $('#v-s-entidad').val();
		var valorEntidad = $('#v-s-valor-entidad').val();
		var valorSistema = $('#v-s-valor-sistema').val();

		$element.bootstrapTable('append', {

			pais : pais,
			entidad : entidad,
			"valor entidad" : valorEntidad,
			"valor sistema" : valorSistema

		});

	});

}

function editarDVM($element) {

	var selected = $element.bootstrapTable('getSelections');

	if (selected.length > 0) {

		var entidad = selected[0];
		$('#v-s-pais').val(entidad.pais);
		$('#v-s-entidad').val(entidad.entidad);
		$('#v-s-valor-entidad').val(entidad['valor entidad']);
		$('#v-s-valor-sistema').val(entidad['valor sistema']);

		$('#valorSistemaScr').modal('show');

	}

}

$(function() {

	$('#tabDVMs').click(function (e) {

		e.preventDefault();

		$('#tabDVMs').addClass('active');
		$('#tabPaises').removeClass('active');
		$('#tabEntidades').removeClass('active');

		var html = $('#tab-dvms').html();
		$('.tab-content').html(html);

	});

	$('#j-dvms-button-agregar').click(function (e) {

		agregarDVM($dvmTable);

	});

	$('#j-dvms-button-modificar').click(function (e) {

		editarDVM($dvmTable);

	});

	$('#j-dvms-button-quitar').click(function(e) {

		removeDVM($dvmTable);

	});


	$('#tabPaises').click(function (e) {

		e.preventDefault();

		$('#tabDVMs').removeClass('active');
		$('#tabPaises').addClass('active');
		$('#tabEntidades').removeClass('active');

		var html = $('#tab-paises').html();
		$('.tab-content').html(html);

	});

	$('#tabEntidades').click(function (e) {

		e.preventDefault();

		$('#tabDVMs').removeClass('active');
		$('#tabPaises').removeClass('active');
		$('#tabEntidades').addClass('active');

		var html = $('#tab-entidades').html();
		$('.tab-content').html(html);

	});

});