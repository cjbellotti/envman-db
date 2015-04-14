var fs = require('fs');

fs.readdir('./app/tables', function (err, files) {
	console.log(files);
});
