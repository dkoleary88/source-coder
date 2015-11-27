angular.module('SourceApp', [])

  .factory('SourceFactory', ['$http', function($http) {
    return {
      getSource: function(url) {
        var data = {url: url};
        return $http.post('/source', data);
      }
    };
  }])

  .controller('SourceCtrl', ['$scope', 'SourceFactory', function($scope, SourceFactory) {
    $scope.url = 'http://';
    $scope.html = '';
    $scope.tags = {};

    $scope.resetURL = function () {
      $scope.url = 'http://';
    };

    $scope.source = function() {
      SourceFactory.getSource($scope.url)
        .then(function(res) {
          $scope.html = res.data.html;
          $scope.tags = res.data.tags;
        });
    };
  }]);
