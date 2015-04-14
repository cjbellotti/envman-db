window.views.menu = new EnvMan.Views.Menu();
window.collections.jobs = new EnvMan.Collections.Jobs();
window.views.jobstable = new EnvMan.Views.JobsTable(window.collections.jobs);

$(function() {
	var v = new EnvMan.Views.Index();
	$('#main').html(v.el);
	v.render();
})