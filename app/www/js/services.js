angular.module('starter.services', [])

.factory('Mesas', ['$http', function($http) {

  $http.jsonp('http://easyorder.esy.es/model/functions.php?callback=JSON_CALLBACK&selectmesa=null')
    .success(function(data, status, headers, config) {
      console.log(data);
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });

  var mesas = [
      {
          id : 1,
          codigo: 11
      },{
          id : 2,
          codigo: 22
      },{
          id : 3,
          codigo: 33
      },{
          id : 4,
          codigo: 44
      },
  ];

  return {
    all: function() {
      return mesas;
    },
    get: function(mesaId) {
      return null;
    }
  };
}]);
