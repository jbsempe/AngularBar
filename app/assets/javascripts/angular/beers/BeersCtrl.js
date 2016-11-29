app.controller('BeersCtrl', ['$scope', 'Beer', function($scope, Beer) {
  $scope.beers = Beer.query();
  $scope.editing = {};

  $scope.addBeer = function() {
    if (!valid()) { return false; }

    Beer.save($scope.beer,
      function(response, _headers) {
        $scope.beers.push(response);
      },
      function(response) {
        alert('Errors: ' + response.data.errors.join('. '));
      }
    );

    $scope.beer = {};
  };

  valid = function() {
    return !!$scope.beer &&
      !!$scope.beer.name
  }

  $scope.filterBeers = function() {
    Beer.search({query: $scope.search},
      function(response, _headers) {
        $scope.beers = response;
      }
    );
  };

  $scope.toggleForm = function(beer) {
   if (beer.id === $scope.editing.id) {
     return 'form';
   }
   else {
     return 'row';
   }
  };

  $scope.editBeer = function(beer) {
   $scope.editing = angular.copy(beer);
  };

  $scope.updateBeer = function(index) {
   Beer.update($scope.editing,
     function(response, _headers) {
       $scope.beers[index] = angular.copy($scope.editing);
       $scope.hideForm();
     },
     function(response) {
       alert('Errors: ' + reponse.data.errors.join('. '));
     }
   );
  };

  $scope.hideForm = function() {
   $scope.editing = {};
  };

  $scope.destroyBeer = function(beer, index) {
    Beer.delete(beer,
      function(response, _headers) {
        $scope.beers.splice(index, 1);
      }
    );
  };

}]);
