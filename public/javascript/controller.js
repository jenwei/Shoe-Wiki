angular.module('ShoeWikiApp', [])
  .controller('ShoeWikiController', function($scope, $http){
  	$scope.shoes = []
  })



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
