<% if (uiframework === 'angular ui bootstrap') { %>
angular.module('<%= name %>',
	[
	'ui.bootstrap',
	'ui.router'<% if (hasModules) { %>, <%- angularModules %> <% } %> ])
<% } else if (uiframework === 'angular material') { %>
angular.module('<%= name %>',
	[
	'ngMaterial',
	'ui.router'<% if (hasModules) { %>, <%- angularModules %> <% } %> ])
<% } else { %>
angular.module('<%= name %>',
	[
	'ui.router' <% if (hasModules) { %>, <%- angularModules %> <% } %> ])
<% } %>
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('main', {
			url: "/",
			templateUrl: "modules/main/views/main.html",
      controller  : "MainController"
		});
});
