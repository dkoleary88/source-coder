angular.module('SourceApp', ['ngSanitize'])

  .factory('SourceFactory', ['$http', function($http) {
    return {
      getSource: function(url) {
        var data = {url: url};
        return $http.post('/source', data);
      }
    };
  }])

  .controller('SourceCtrl', ['$scope', '$sce', 'SourceFactory', function($scope, $sce, SourceFactory) {

    $scope.clearView = function () {
      $scope.highlight(false);
      $scope.html = '';
      $scope.tagStyle = '';
      $scope.tags = {};
      $scope.darken = false;
    };

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
      $scope.clearView();
      $scope.toggleButton(false);
      SourceFactory.getSource($scope.url)
        .then(function(res) {
          $scope.html = $sce.trustAsHtml(res.data.html);
          $scope.tags = res.data.tags;
          $scope.toggleButton(true);
        })
        .catch(function (err) {
          $scope.invalidURL = true;
          $scope.toggleButton(true);
        });
    };

    $scope.highlight = function (tagName) {
      $('span[id=tag-'+$scope.highlighted+']').removeClass('tag-highlight');
      $scope.darken = false;
      if (tagName){
        $('span[id=tag-'+tagName+']').addClass('tag-highlight');
        $scope.highlighted = tagName;
        $scope.darken = true;
      }
    };

    $scope.toggleButton(true);
    $scope.clearView();

  }]);
