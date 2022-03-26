(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.handleSearch = function () {
            var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
            promise.then(function (response) {
                menu.found = response;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        menu.removeItem = function (itemIndex) {
            console.log("remove yo");
            menu.found.splice(itemIndex, 1);
          };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        service.getMatchedMenuItems = function (shortName) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                searchTerm: shortName
            })
            .then(function (response) {
                if (response.config.searchTerm == null || response.config.searchTerm == "") {
                    return [];
                }
                var releventItems = (response.data.menu_items.filter(item => item.description.toLowerCase().includes(response.config.searchTerm.toLowerCase())));
                return releventItems;
            })
            .catch(function (error) {
                console.log(error);
            })
            return response;
        };
    }

    function FoundItemsDirective() {
        var ddo = {
          templateUrl: 'foundItem.html',
          scope: {
            found: '<',
            onRemove: '&'
          },
          controller: NarrowItDownController,
          controllerAs: 'menu',
          bindToController: true
        };
        return ddo;
      }
})();