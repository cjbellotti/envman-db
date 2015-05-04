function MyTable(config) {

	var style = $('<style/>');

	style.append(".myTable { width: 100%; border : 1px solid gray; border-radius: 3px;}");
	style.append(".myTable-header { width : 100%; overflow-y : scroll;}");
	style.append(".myTable-table-header { width : 100%; border-collapse: collapse; float : left;}");
	style.append(".myTable-body { width: 100%; overflow-y : scroll; height : 200px;}");
	style.append(".myTable-table-body { width : 100%; border-collapse: collapse; position: relative; }");
	style.append(".myTable-cell-header { border : 1px solid gray; }");
	style.append(".myTable-cell-body { border : 1px solid gray; }");
	style.append(".myTable-header-checkbox { border : 1px solid gray; text-align : center; }");
	style.append(".myTable-body-checkbox { border : 1px solid gray; text-align : center; }");

	$('head').append(style);

	var tableData = [];

	var myTableDiv = $('<div class="myTable"/>');
	myTableDiv.bind('resize', function() {
		console.log(this.width());
	});

	var headerDiv = $('<div class="myTable-header"/>');
	var tableHeader = $('<table class="myTable-table-header"/>');
	headerDiv.append(tableHeader);
	//var divRelleno = $('<div style="background: green; width : 17px; height: 20px; float: left;"/>');
	//headerDiv.append(divRelleno);

	var thead = $('<thead/>');

	var row = $('<tr/>');

	var cellWidth = 0;
	if (config.headers) {
		if (config.headers.length > 0) {
			cellWidth = 95 / config.headers.length;
		}
	}

	if (config.selectable) {

		var th = $('<th/>');
		th.addClass('myTable-header-checkbox');
		var checkbox = $('<input type="checkbox" class="myTable-checkbox"></input>');

		checkbox.on('click', function () {

			var value = checkbox.prop('checked');

			for (var index in tableData) {

				tableData[index].find('input').prop('checked', value);

			}

		});

		th.css('width', '5%');

		th.append(checkbox);
		row.append(th);

	}

	for (var header in config.headers) {

		var th = $('<th/>');
		th.html(config.headers[header]);
		th.addClass('myTable-cell-header');
		th.css('width', cellWidth + '%');
		row.append(th);
	}

	thead.append(row);

	tableHeader.append(thead);

	myTableDiv.append(headerDiv);

	var bodyDiv = $('<div class="myTable-body"/>');
	var tableBody = $('<table class="myTable-table-body"/>');
	var tBody = $('<tbody/>');
	tableBody.append(tBody);
	bodyDiv.append(tableBody);

	myTableDiv.append(bodyDiv);

	myTableDiv.addRow = function (data) {

		var row = $('<tr/>');

		if (config.selectable) {

			var td = $('<td/>');
			var checkbox = $('<input type="checkbox" class="myTable-checkbox"></input>');
			checkbox.on('change', function () {

				var value = checkbox.prop('checked');
				if (value) {
					row.css('background', 'green');
				} else {
					row.css('background', 'white');
				}

			})
			td.addClass('myTable-body-checkbox');
			td.append(checkbox);
			td.css('width', '5%')
			row.append(td);

		}

		for (var field in data) {
			var td = $('<td/>');
			td.html(data[field]);
			td.css('width', cellWidth + '%');
			td.addClass('myTable-cell-body');
			row.append(td);
		}

		tBody.append(row);
		tableData.push(row);

	}

	myTableDiv.getRow = function (index) {

		return tableData[index];

	}

	myTableDiv.removeRow = function (index) {

		tableData[index].remove();
		tableData = _.without(tableData, tableData[index]);

	}

	myTableDiv.removeRows = function (rows) {

		var rowsElements = [];

		for (var index in rows) {

			rowsElements.push(tableData[rows[index]]);

		}

		for (var index in rowsElements) {

			tableData = _.without(tableData, rowsElements[index]);
			rowsElements[index].remove();

		}

	}

	myTableDiv.removeSelectedRows = function () {
		var rows = myTableDiv.getSelectedRows();
		if (rows.length > 0)
			myTableDiv.removeRows(rows);
	}

	myTableDiv.getSelectedRows = function () {

		var selecteds = [];

		for (var index in tableData) {
			if(tableData[index].find('input').prop('checked'))
				selecteds.push(parseInt(index));
		}

		return selecteds;

	}

	myTableDiv.setHeight = function (height) {
		bodyDiv.css('height', height + 'px');
	}

	myTableDiv.reset = function () {
		for (var index in tableData) {
			tableData[index].remove();
		}
		tableData = [];
	}

	myTableDiv.setArrayData = function (array, options) {

		options = options || {};

		this.arrayData = array;
		myTableDiv.reset();
		for (var index in this.arrayData) {

			var data = {};
			var item = this.arrayData[index];
			if (options.fields) {

				for (var field in item) {

					if (_.indexOf(options.fields, field) >= 0)
						data[field] = item[field];

				}

			} else {

				data = item;

			}

			myTableDiv.addRow(data);

		}

	}

	myTableDiv.reloadArrayData = function() {


	}

	myTableDiv.getRowArrayData = function (index) {

		var ret = null;
		
		if (this.arrayData) {

			if (index < this.arrayData.length) {
				ret = this.arrayData[index];
			}

		}

		return ret;
	}

	return myTableDiv;
}