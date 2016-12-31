'use strict';

angular.module('maxxApp')
  .controller('ShowsCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    console.log('show view');


   $http.get('/api/shows')
    .success(function(data) {
      $scope.shows = data;
      console.log($scope.shows);
    })
    .error(function(err) {
      alert('Error! Something went wrong');
    });


  });
