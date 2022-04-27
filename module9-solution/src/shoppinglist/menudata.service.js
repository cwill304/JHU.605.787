(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', '$q', '$timeout']
function MenuDataService($http, $q, $timeout) {
  var service = this;
  var items = [];
  var response = $http({
    method: "GET",
    url: "https://davids-restaurant.herokuapp.com/categories.json"
  })
  .then(function (response) {
    response.data.forEach( o => {
      var item = {
        name: o.name,
        id: o.id
      }
      items.push(item);
    });
  })
  .catch(function (error) {
    console.log(error);
  })
  service.getItems = function () {
    var deferred = $q.defer();
    $timeout(function () {
      deferred.resolve(items);
    }, 800);
    return deferred.promise;
  };
}
})();
