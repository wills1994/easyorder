angular.module('starter.controllers', ['starter.services'])

.controller('HomeCtrl', ['Mesas', '$state', '$scope', function(Mesas, $state, $scope) {

    Mesas.all(function(mesas){
        $scope.mesas = mesas;
    });

    $scope.adelante = function(mesaId) {
        console.log('HomeCtrl.adelante()');
        // Obtener el valor de la mesa
        // Enviar el estado al servidor
        Mesas.changeState(mesaId);
        // Navegar a otra pantalla para mostrar la carta
        $state.go('tab.carta', {}, {reload: true});
    }

}])

.controller('CartaCtrl', ['Carta', '$scope', function(Carta, $scope){
    console.log('CartaCtrl');

    Carta.getCategorias(function(categorias){
        for (cat in categorias) {
            for (producto in categorias[cat].productos) {
                categorias[cat].productos[producto].cantidad = 0;
            }
        }

        $scope.categorias = categorias;
    });

    $scope.sumar = function(producto){
        producto.cantidad++;
    };

    $scope.restar = function(producto){
        if (producto.cantidad > 0) {
            producto.cantidad--;
        }
    };
}])

;
