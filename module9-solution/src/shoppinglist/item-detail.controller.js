(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);

// 'item' is injected through state's resolve
ItemDetailController.$inject = ['$http', 'item']
function ItemDetailController($http, item) {
  var itemDetail = this;
  //https://davids-restaurant.herokuapp.com/categories/83.json
  console.log(item);
  console.log(this);
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
