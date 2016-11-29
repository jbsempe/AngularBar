var app = angular.module('angularExample');

app.factory('Beer', ['$resource', function($resource) {
  return $resource('/api/beers/:id.json', {id: '@id'}, {
    update: { method: 'PUT' },
    delete: {
      action: 'destroy',
      method: 'DELETE',
      url: '/api/beers/:id.json',
      params: {
        id: '@id'
      }
    },
    search: {
      method: 'GET',
      isArray: true,
      url: '/api/beers/search.json',
      params: {
        query: '@query'
      }
    }
  });
}]);
