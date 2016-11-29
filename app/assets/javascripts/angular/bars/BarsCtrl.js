app.controller('BarsCtrl', ['$scope', 'Bar', function($scope, Bar) {
  $scope.bars = Bar.query();
  $scope.editing = {};

  $scope.addBar = function() {
    if (!valid()) { return false; }

    Bar.save($scope.bar,
      function(response, _headers) {
        $scope.bars.push(response);
      },
      function(response) {
        alert('Errors: ' + response.data.errors.join('. '));
      }
    );

    $scope.bar = {};
  };

  valid = function() {
    return !!$scope.bar &&
      !!$scope.bar.name
  }

  $scope.filterBars = function() {
    Bar.search({query: $scope.search},
      function(response, _headers) {
        $scope.bars = response;
      }
    );
  };

  $scope.toggleForm = function(bar) {
   if (bar.id === $scope.editing.id) {
     return 'form';
   }
   else {
     return 'row';
   }
  };

  $scope.editBar = function(bar) {
   $scope.editing = angular.copy(bar);
  };

  $scope.updateBar = function(index) {
   Bar.update($scope.editing,
     function(response, _headers) {
       $scope.bars[index] = angular.copy($scope.editing);
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

  $scope.destroyBar = function(bar, index) {
    Bar.delete(bar,
      function(response, _headers) {
        $scope.bars.splice(index, 1);
      }
    );
  };

}]);
