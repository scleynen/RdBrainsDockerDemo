var shopControllers = angular.module('shopControllers', []);

shopControllers.controller('CatalogCtrl', ['$scope', '$http',
  function ($scope, $http) {

      $scope.addCart = function (product) {
          $http.post("/api/cart/addCart/" + product);
      };

      $http.get('api/products').success(function (data) {
          $scope.products = data;
      });
  }]);

shopControllers.controller('CartCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get('api/cart/getCart').success(function (data) {
          $scope.cartItems = data;
      });
      $http.get('api/products').success(function (data) {
          $scope.products = data;
      });
  }]);