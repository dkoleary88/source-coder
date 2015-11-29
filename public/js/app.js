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

    // Resets the view
    $scope.clearView = function () {
      $scope.highlight(false);
      $scope.html = '';
      $scope.tags = {};
    };

    // Toggles the button view between enabled and disabled
    $scope.toggleButton = function (enable) {
      if (enable) {
        $scope.buttonText = 'Get Source Code';
        $scope.loading = false;
      } else {
        $scope.buttonText = 'Loading...';
        $scope.loading = true;
      }
    };

    // Resets the URL field to 'http://'
    $scope.resetURL = function () {
      $scope.url = 'http://';
      $scope.invalidURL = false;
    };

    // Sends source code request to server and updates view accordingly
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

    // Highlights the code given a tag name
    $scope.highlight = function (tagName) {
      $('span[id=tag-'+$scope.highlighted+']').removeClass('tag-highlight');
      if (tagName){
        $('span[id=tag-'+tagName+']').addClass('tag-highlight');
        $scope.highlighted = tagName;
      }
    };

    // Initialize view on page load
    $scope.toggleButton(true);
    $scope.clearView();

  }]);
