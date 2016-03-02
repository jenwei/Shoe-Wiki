/*
angular routes
*/

var ShoeWiki = angular.module('ShoeWikiApp', ['ngRoute'])
	.run(function($rootScope) {
		$rootScope.posts = [];
	});

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
		.when('/pages/:subj', {
			templateUrl: '/html/pages.html',
			controller: 'pageController'
		})
		.when('/new', {
			templateUrl: '/html/new.html',
			controller: 'newController'
		})
		.when('/search/:tags', {
			templateUrl: '/html/search.html',
			controller: 'searchController'
		})
});

ShoeWiki.controller('mainController', function($scope, $rootScope, $http) {
    // create a message to display in our view
		$rootScope.posts = [];

    $http.get('/api/posts')
	    .success(function(data) {
	    	$rootScope.posts = data;
				// 		console.log($scope.posts);
		})
		.error(function(data) {
		    console.log('Error: ' + data);
		});
});

ShoeWiki.controller('pageController', function($scope, $rootScope, $routeParams, $http) {
    // create a message to display in our view
		console.log("Now within pages Controller");
    var subj = $routeParams.subj;
		$scope.nothingWrong = true;
		console.log(subj);
		$rootScope.posts.forEach(function(element, index, array) {
			if (element.url === subj){
				$scope.post = element;
			};
		});
		if ($scope.post === undefined) {$scope.nothingWrong = false};
});

ShoeWiki.controller('newController', function($scope, $rootScope, $http) {
    // create a message to display in our view
    $http.get('/api/new')
	    .success(function(data) {

		})
		.error(function(data) {
		    console.log('Error: ' + data);
		});
});

ShoeWiki.controller('searchController', function($scope, $rootScope, $routeParams, $http) {
    // create a message to display in our view
    var tags = $routeParams.tags.split("+")
		console.log(tags);

});

// angular.module('ShoeWikiApp', [])
//    .controller('ShoeWikiController', function($scope, $http) {
//      $scope.tasks = [];
//      $scope.completed = [];
//      $scope.taskobjs = [];
//      console.log("in the controller");
//      $http.get('/api/tasks')
//         .success(function(data) {
//             data.forEach(function(element, index, array) {
//               console.log(element);
//               if (element.completed) {
//                 $scope.completed.push(element);
//               } else {
//                 $scope.tasks.push(element);
//               };
//             });
//             console.log($scope.tasks);
//         })
//         .error(function(data) {
//             console.log('Error: ' + data);
//         });

//      $scope.add = function() {
//       $scope.tasks.push($scope.task)
//       console.log($scope.task);

//       $http.post('/api/tasks', $scope.task)
//             .success(function(data) {
//                 $scope.task = {}; // clear the form so our user is ready to enter another
//                 $scope.tasks = [];
//                 $scope.completed = [];
//                 console.log(data);
//                 data.forEach(function(element, index, array) {
//                   if (element.completed) {
//                     $scope.completed.push(element);
//                   } else {
//                     $scope.tasks.push(element);
//                   };
//                 })
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//        };

//      $scope.complete = function() {
//       remov = $scope.tasks.splice(this.$index, 1);
//       console.log(remov);
//       $scope.completed.push(remov[0])

//       $http.delete('/api/tasks/' + remov[0]._id)
//             .success(function(data) {
//                 $scope.todos = data;
//                 console.log(data);
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//      };

//      $scope.edit = function() {
//       edit = $scope.tasks[this.$index];
//       console.log(edit);

//       $http.post('/api/tasks/' + edit._id, edit)
//             .success(function(data) {
//                 console.log(data);
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//      };

// });
