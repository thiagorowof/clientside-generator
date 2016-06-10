//angular.module('<%= name %>', ['ui.router','ui.bootstrap','ui.touch','ui.animate', 'ngMaterial']);
<% if (uiframework === 'angular ui bootstrap') { %>
angular.module('<%= name %>', ['ui.bootstrap', 'ui.router'])
<% } else if (uiframework === 'angular material') { %>
angular.module('<%= name %>', ['ngMaterial', 'ui.router'])
<% } else { %>
angular.module('<%= name %>', ['ui.router'])
<% } %>



.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('main', {
			url: "/",
			templateUrl: "modules/views/mainView.html",
      controller  : "MainController"
		});
});
