(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.handleSearch = function () {
            var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
            promise.then(function (response) {
                menu.items = response;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
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
                var releventItems = (response.data.menu_items.filter(item => item.description.toLowerCase().includes(response.config.searchTerm.toLowerCase())));
                return releventItems;
            })
            .catch(function (error) {
                console.log(error);
            })
            return response;
        };
    }
})();