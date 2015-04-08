angular.module('starter.controllers', ['starter.services'])

.controller('HomeCtrl', ['Mesas', '$scope', function(Mesas, $scope) {

    $scope.mesas = Mesas.all();

}])

;
