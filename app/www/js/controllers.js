var g_id_mesa=null;
angular.module('starter.controllers', ['starter.services'])

.controller('HomeCtrl', ['Mesas', '$state', '$scope', function(Mesas, $state, $scope) {

    Mesas.all(function(mesas){
        $scope.mesas = mesas;
    });


    $scope.adelante = function(mesaId) {
        console.log('HomeCtrl.adelante()');
        // Obtener el valor de la mesa
        // Enviar el estado al servidor
        g_id_mesa=mesaId;
        Mesas.changeState(mesaId);
        
        // Navegar a otra pantalla para mostrar la carta
        $state.go('tab.carta',{idMesa:mesaId}, {reload: true});
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

   
    var totalCantidad=0;

    $scope.sumar = function(producto){
        producto.cantidad++;
        totalCantidad += 1;
        $scope.totalCantidad2=totalCantidad;
    };

    $scope.restar = function(producto){
        if (producto.cantidad > 0) {
            producto.cantidad--;
            totalCantidad -= 1;
            $scope.totalCantidad2=totalCantidad;
        }
    };

    $scope.totalCantidad2=2;

}])
.controller('CamareroCtrl', ['Camarero', '$scope', function(Camarero, $scope){
    console.log('CamareroCtrl');
    $scope.llamar=function(){
        Camarero.changeState(g_id_mesa);
    }

}])
.controller('PedidoCtrl', ['Pedido', '$scope', function(PedidoCtrl, $scope){
    console.log('PedidoCtrl');
    console.log(g_id_mesa);

}])
;
