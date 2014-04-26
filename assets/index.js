angular.module('app', [
  'ngSails',
  'directives.imageUpload'
])

.config(['$sailsProvider', function ($sailsProvider) {
  $sailsProvider.url = "http://" + window.location.hostname;
}])

.controller('MainCtrl', function($scope, $sails) {
  $scope.imageUri = '';

  var refreshList = function() {
    $sails.get('/list', function(data) {
      $scope.listItems = data;
    });
  };
  refreshList();

  $scope.delete = function(item) {
    $sails.delete('/list/' + item.id, function(response) {
      
      refreshList();
    });
  };

  $scope.search = function(phrase) {
    debugger;
    $sails.get('/list/search', {
      phrase: phrase
    }, function(response) {
      debugger;
      $scope.listItems = response;
    });
  };

  $scope.save = function(image, name) {
    $sails.post('/list', {
      imageUri: image,
      name: name,
    }, function(response) {
      $scope.imageUri = '';
      $scope.name = '';
      $scope.listItems.push(response);
    });
  };
});
