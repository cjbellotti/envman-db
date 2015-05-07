var fs = require('fs'),
    _ = require('underscore');

function initialize (path) {

	var data = [];
	var dataFile;

	dataFile = path;
	contentData = fs.readFileSync(dataFile);

	data = JSON.parse(contentData);

	var functions = {};

	functions.create = function (contentData) {

		data.push(contentData);

		fs.writeFileSync(dataFile, JSON.stringify(data));

		return contentData;

	};

	functions.read = function (query) {

		var ret;
		if (_.allKeys(query).length > 0) {

			var i = _.findIndex(data, query);
			if (i >= 0)
				ret = data[i];
			else
				ret = null;


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

	functions.lastId = function () {
		var ret = _.last(data) || { ID : 0 };
		return ret.ID;
	}

	return functions;
}

module.exports = initialize;