(function() {
    "use strict";
    angular.module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive('foundItems', foundItemsDirective);

    NarrowItDownController.$inject = ["$scope", "MenuSearchService"];
    function NarrowItDownController($scope, MenuSearchService) {
        var controller = this;
        controller.searchInput = "";
        var obj1 = {"name": "one", "quantity": 1};
        var obj2 = {"name": "two", "quantity": 2};
        controller.items = [obj1,obj2];
        controller.resultsToDisplay = [];
        controller.handleSearch = function () {
            var promise = MenuSearchService.getMatchedMenuItems(controller.searchInput);
            promise.then(function(response){
                controller.items = response;
                console.log(response);
            });
        } 

        controller.removeItem = function (itemIndex) {
            console.log("'this' is: ", this);
            //this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
            MenuSearchService.removeItem(itemIndex);
           // this.title = origTitle + " (" + list.items.length + " items )";
          };

    }

    MenuSearchService.$inject = ["$http"];
    function MenuSearchService($http) {
        var service = this;
        var items = [];
        service.getMatchedMenuItems = function(searchTerm) {
            console.log("Search term is " + searchTerm);
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
                searchTerm: searchTerm
            }).then(function (result) {
                var searchTerm = result?.config?.searchTerm;
                var menuItems = result?.data?.menu_items;
                return menuItems.filter(item => (item.description).includes(searchTerm));
            });
        }

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };


    }

    function foundItemsDirective() {
        var ddo = {
          templateUrl: 'listItem.html',
          scope: {
            found: '<',
            onRemove: '&'
          },
          controller: NarrowItDownController,
          controllerAs: 'list',
          bindToController: true
        };
      
        return ddo;
      }


})();