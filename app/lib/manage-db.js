var oracledb = require('oracledb');

function exectuteQuery(config, callback) {

		oracledb.getConnection(
			{
				user : config.username,
				password : config.password,
				connectString : config.hostname + ((config.port) ? (':' + config.port) : '') + '/' + config.db 
			}, function (err, connection) {
			
				if (err) {

					console.log(err);
					callback(err);

				} else { 

					connection.execute(config.query, function (err, result) {

						connection.release(function (err) {
							if(err)
								console.log(err);
						});

						if(err) {

							callback(err);

						} else {
							
							var data = [];

							for (var indexRow in result.rows) {

								var row = {};
								for (var indexColumn in result.metaData) {

									row[result.metaData[indexColumn].name] = result.rows[indexRow][indexColumn];	
								}
								data.push(row);	

							}

							callback(null, data);

						}

					});

				}

			} 
		 
		);

}

module.exports = exectuteQuery;
