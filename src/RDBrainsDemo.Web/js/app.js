var rdBrainsApp = angular.module('rdBrainsDemo', [
    'ngRoute',
     'shopControllers'
]);

rdBrainsApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/catalog', {
            templateUrl: 'partials/catalog.html',
            controller: 'CatalogCtrl'
        }).
        when('/cart', {
            templateUrl: 'partials/cart.html',
            controller: 'CartCtrl'
        }).
        otherwise({
            redirectTo: '/catalog'
        });
  }]);


