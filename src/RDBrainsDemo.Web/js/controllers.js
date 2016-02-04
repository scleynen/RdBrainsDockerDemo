var rdBrainsApp = angular.module('rdBrainsDemo', []);

rdBrainsApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

rdBrainsApp.controller('ProductsController', function ($scope, $http) {

        $http.get("http://192.168.99.100:5001/api/products")
        .then(function (response) { $scope.products = response.data; });
    });


