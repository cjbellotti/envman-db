var fs = require('fs'),
    _ = require('underscore');

var data = [];
var functions = {};
var dataFile;
function initialize (path) {

	dataFile = path;
	fs.readFile(dataFile, function (err, contentData) {

		if (err) throw err;

		data = JSON.parse(contentData);

	});

	return functions;
}

functions.create = function (contentData) {

	data.push(contentData);

	fs.writeFileSync(dataFile, JSON.stringify(data));

	return contentData;

};

functions.read = function (query) {

	var ret;
	if (_.allKeys(query).length > 0) {

		var match = false;
		for (var i = 0; i < data.length && !match; i++) {

			match=true;
			for (key in query) {

				if (query[key] != data[i][key])
					match=false;

			}

			if (match)
				ret = data[i];

		}

		if (!match)
			ret=undefined;

	} else {

		ret = data;

	}

	return ret;

};

functions.update = function (query, contentData) {

	var ret;
	var match = false;
	for (var i = 0; i < data.length && !match; i++) {

		match=true;
		for (key in query) {

			if (query[key] != data[i][key])
				match=false;

		}

		if (match) {

			for (var key in contentData) {

				data[i][key] = contentData[key];

			}
			ret = data[i];

			fs.writeFileSync(dataFile, JSON.stringify(data));
		}

	}

	return ret;

}

functions.delete = function(query) {

	var match = false;
	for (var i = 0; i < data.length && !match; i++) {

		match=true;
		for (key in query) {

			if (query[key] != data[i][key])
				match=false;

		}

		if (match) {

			data = _.without(data, data[i]);
			fs.writeFileSync(dataFile, JSON.stringify(data));
		}

	}

	return {};

}

module.exports = initialize;