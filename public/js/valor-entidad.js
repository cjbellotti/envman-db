function removeValorEntidad ($table) {

	var selected = $table.bootstrapTable('getSelections');

	var toRemove = $.map(selected, function(row) {
		return row.index;
	});

	$table.bootstrapTable('remove', {

		indexes : toRemove

	});

}

function fromToValorEntidad($from, $to) {

	var selected = $from.bootstrapTable('getSelections');
	$to.bootstrapTable('append', selected);

	removeValorEntidad($from);

}

function agregarValorEntidad($element) {	

	$valorEntidadScreen.find('#v-e-s-button-aceptar').unbind('click');
	$valorEntidadScreen.find('#v-e-s-button-aceptar').click(function (e) {

		var pais = $('#v-e-s-pais').val();
		var entidad = $('#v-e-s-entidad').val();
		var valor = $('#v-e-s-valor').val();
		var descripcion = $('#v-e-s-descripcion').val();

		$element.bootstrapTable('append', {

			entidad : entidad,
			valor : valor,
			descripcion : descripcion
		});

	});

}

function editarValorEntidad($element) {

	var selected = $element.bootstrapTable('getSelections');

	if (selected.length > 0) {

		var entidad = selected[0];
		$('#v-e-s-pais').val(entidad.pais);
		$('#v-e-s-entidad').val(entidad.entidad);
		$('#v-e-s-valor').val(entidad.valor);
		$('#v-e-s-descripcion').val(entidad.descripcion);

		$('#valorEntidadScr').modal('show');

	}

}

$(function() {

	$('#v-e-button-right').click(function(e) {

		fromToValorEntidad($valorEntidadFrom, $valorEntidadTo);

	});

	$('#v-e-button-left').click(function(e) {

		fromToValorEntidad($valorEntidadTo, $valorEntidadFrom);

	});

	$('#v-e-button-agregar').click(function (e) {

		agregarValorEntidad($valorEntidadTo);

	});

	$('#v-e-button-modificar').click(function (e) {

		editarValorEntidad($valorEntidadTo);

	});

	$('#v-e-button-quitar').click(function(e) {

		removeValorEntidad($valorEntidadTo);

	});

});