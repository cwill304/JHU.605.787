(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);
ItemDetailController.$inject = ['$http', 'item']
function ItemDetailController($http, item) {
  var itemDetail = this;
  var response = $http({
    method: "GET",
    url: "https://davids-restaurant.herokuapp.com/categories/" + item.id + ".json"
  })
  .then(function (response) {
    var info = response.data;
    itemDetail.id = info.id;
    itemDetail.short_name = info.short_name;
    itemDetail.name = info.name;
    itemDetail.special_instructions = info.special_instructions;
  })
  .catch(function (error) {
    console.log(error);
  })
}

})();
