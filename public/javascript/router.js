/*
angular routes 
*/

var ShoeWiki = angular.module('ShoeWikiApp', ['ngRoute']);

// angular.module('ShoeWikiApp', [])
//   .controller('ShoeWikiController', function($scope, $http){
//   	$scope.shoes = []
//   })

ShoeWiki.config(function($routeProvider) {
	console.log("using angular");
	$routeProvider
		.when('/', {
			templateUrl: '/html/home.html',
			controller: 'mainController'
		})
});

ShoeWiki.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Welcome';
});