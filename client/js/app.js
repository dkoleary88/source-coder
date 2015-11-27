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
    $scope.html = '';
    $scope.tags = {};

    $scope.toggleButton = function (enable) {
      if (enable) {
        $scope.buttonText = 'Get Source Code';
        $scope.loading = false;
      } else {
        $scope.buttonText = 'Loading...';
        $scope.loading = true;
      }
    };

    $scope.resetURL = function () {
      $scope.url = 'http://';
      $scope.invalidURL = false;
    };

    $scope.source = function() {
      $scope.toggleButton(false);
      SourceFactory.getSource($scope.url)
        .then(function(res) {
          $scope.html = res.data.html;
          $scope.tags = res.data.tags;
          $scope.toggleButton(true);
        })
        .catch(function (err) {
          $scope.invalidURL = true;
          $scope.toggleButton(true);
        });
    };

    $scope.toggleButton(true);

  }]);
