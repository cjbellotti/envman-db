// Entidades 

function removeEntidad ($table) {

	var selected = $table.bootstrapTable('getSelections');

	var toRemove = $.map(selected, function(row) {
		return row.index;
	});

	$table.bootstrapTable('remove', {

		indexes : toRemove

	});

}

function fromToEntidad($from, $to) {

	var selected = $from.bootstrapTable('getSelections');
	$to.bootstrapTable('append', selected);

	removeValorEntidad($from);

}

function agregarEntidad($element) {	

	$valorEntidadScreen.find('#e-button-aceptar').unbind('click');
	$valorEntidadScreen.find('#e-button-aceptar').click(function (e) {

		var nombre = $('#e-nombre').val();
		var descripcion = $('#e-descripcion').val();

		$element.bootstrapTable('append', {

			entidad : nombre,
			descripcion : descripcion

		});

	});

}

function editarEntidad($element) {

	var selected = $element.bootstrapTable('getSelections');

	if (selected.length > 0) {

		var entidad = selected[0];
		$('#e-nombre').val(entidad.entidad);
		$('#e-descripcion').val(entidad.descripcion);

		$('#entidadScr').modal('show');

	}

}

$(function() {

	$('#e-button-right').click(function(e) {

		fromToEntidad($entidadFrom, $entidadTo);

	});

	$('#e-button-left').click(function(e) {

		fromToEntidad($entidadTo, $entidadFrom);

	});

	$('#e-button-agregar').click(function (e) {

		agregarEntidad($entidadTo);

	});

	$('#e-button-modificar').click(function (e) {

		editarEntidad($entidadTo);

	});

	$('#e-button-quitar').click(function(e) {

		removeEntidad($entidadTo);

	});

	$('#e-button-siguiente').click(function(e) {

		var pais = $('#e-pais').val();
		$('#v-e-pais').val(pais);

	});

});