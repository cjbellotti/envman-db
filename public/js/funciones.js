$(function() {

	$('#dvm-table').bootstrapTable({}).on('all.bs.table', function(e, data) {

		console.log(e);
		var html = $('#tab-dvms').html();
		$('.tab-content').html(html);

	});

});