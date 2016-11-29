var app = angular.module('angularExample');

app.factory('Bar', ['$resource', function($resource) {
  return $resource('/api/bars/:id.json', {id: '@id'}, {
    update: { method: 'PUT' },
    delete: {
      action: 'destroy',
      method: 'DELETE',
      url: '/api/bars/:id.json',
      params: {
        id: '@id'
      }
    },
    search: {
      method: 'GET',
      isArray: true,
      url: '/api/bars/search.json',
      params: {
        query: '@query'
      }
    }
  });
}]);
