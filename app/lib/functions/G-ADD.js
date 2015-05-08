module.exports = function (env, script, params) {

	var tag = params[1].trim();
	var data = params[0].trim();

	env[tag] += data + '\n';

	return "";

}