angular.module('starter.services', [])

.factory('Mesas', ['$http', function($http) {

  var LIBRE = 0,
      OCUPADO = 1,
      LLAMANDO = 2;

  var getAll = function(callback){
    $http.jsonp('http://easyorder.esy.es/model/functions.php?callback=JSON_CALLBACK&selectmesa=null')
        .success(function(mesas, status, headers, config) {
          callback(mesas);
        })
        .error(function(data, status, headers, config) {
          console.error(status);
        });
  };

  var changeState = function(mesaId){
      $http.jsonp('http://easyorder.esy.es/model/functions.php?callback=JSON_CALLBACK&id_mesa=' + mesaId + '&estado=' + OCUPADO)
        .success(function(mesas, status, headers, config) {

        })
        .error(function(data, status, headers, config) {
          console.error(status);
        });
  };

  return {
    all: function(callback) {
      getAll(callback);
    },
    changeState: function(mesaId) {
      changeState(mesaId);
    }
  };
}])

.factory('Carta', ['$http', function($http){

  var getCategorias = function(callback) {
    $http.jsonp('http://easyorder.esy.es/model/functions.php?callback=JSON_CALLBACK')
        .success(function(productos, status, headers, config) {
          callback(productos);
        })
        .error(function(data, status, headers, config) {
          console.error(status);
        });
  };

  return {
    getCategorias : function(callback) {
      getCategorias(callback);
    }
  };
}])

;