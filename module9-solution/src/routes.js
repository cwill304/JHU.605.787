(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'src/categorylist/templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/categorylist/templates/main-categorylist.template.html',
    controller: 'MainCategoryListController as categories',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getItems();
      }]
    }
  })

  .state('itemDetail', {
    url: '/item-detail/{itemId}',
    templateUrl: 'src/categorylist/templates/item-detail.template.html',
    controller: 'ItemDetailController as itemDetail',
    resolve: {
      item: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItems()
                .then(function (items) {
                  return items[$stateParams.itemId];
                });
            }]
    }
  });
}

})();
