angular.module('starter.services', [])

.factory('Mesas', function() {
  // Might use a resource here that returns a JSON array

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
});
