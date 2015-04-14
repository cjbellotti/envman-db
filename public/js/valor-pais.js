// Valor Pais

function removeValorPais ($table) {

	var selected = $table.bootstrapTable('getSelections');

	var toRemove = $.map(selected, function(row) {
		return row.index;
	});

	$table.bootstrapTable('remove', {

		indexes : toRemove

	});

}

function agregarValorPais($element) {	

	$valorSistemaScreen.find('#v-s-button-aceptar').unbind('click');
	$valorSistemaScreen.find('#v-s-button-aceptar').click(function (e) {

		var entidad = $('#v-s-entidad').val();
		var valorEntidad = $('#v-s-valor-entidad').val();
		var valorSistema = $('#v-s-valor-sistema').val();

		$element.bootstrapTable('append', {

			entidad : entidad,
			"valor entidad" : valorEntidad,
			"valor sistema" : valorSistema

		});

	});

}

function editarValorPais($element) {

	var selected = $element.bootstrapTable('getSelections');

	if (selected.length > 0) {

		var entidad = selected[0];
		$('#v-s-entidad').val(entidad.entidad);
		$('#v-s-valor-entidad').val(entidad['valor entidad']);
		$('#v-s-valor-sistema').val(entidad['valor sistema']);

		$('#entidadScr').modal('show');

	}

}

$(function() {

	$('#v-p-button-agregar').click(function (e) {

		agregarValorPais($valoresPais);

	});

	$('#v-p-button-modificar').click(function (e) {

		editarValorPais($valoresPais);

	});

	$('#v-p-button-quitar').click(function(e) {

		removeValorPais($valoresPais);

	});

});