(function() {
    "use strict";
    angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .filter("customCurrency", CustomFilterFactory)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService) {
        var itemsToBuy = this;
        itemsToBuy.items = ShoppingListCheckOffService.getItemsToBuy();
        itemsToBuy.purchaseItem = function(index, item) {
            ShoppingListCheckOffService.purchaseItem(index, item);
        }   
    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService", "customCurrencyFilter"];
    function AlreadyBoughtController(ShoppingListCheckOffService, customCurrencyFilter) {
        var itemsAlreadyBought = this;
        itemsAlreadyBought.items = ShoppingListCheckOffService.getItemsAlreadyBought();
    }

    function ShoppingListCheckOffService() {

        var service = this;

        var itemsToBuy = [
            {name: "apples", quantity: "4", pricePerItem: 1.32},
            {name: "bananas", quantity: "3", pricePerItem: 0.62},
            {name: "cherries", quantity: "20", pricePerItem: 0.19},
            {name: "oranges", quantity: "5", pricePerItem: 1.45},
            {name: "pears", quantity: "2", pricePerItem: 1.08}
        ];

        var itemsAlreadyBought = [];
        service.purchaseItem = function(index, item) {
            var item = {
                name: item.name,
                quantity: item.quantity,
                totalPricePaid: item.pricePerItem * item.quantity
            }
            itemsAlreadyBought.push(item);
            itemsToBuy.splice(index, 1);
        };

        service.getItemsToBuy = function() {
            return itemsToBuy;
        }

        service.getItemsAlreadyBought = function() {
            return itemsAlreadyBought;
        }
    }

    function CustomFilterFactory() {
        return function (input) {
            if (isNaN(input)) {
                return " - invalid quantity entered";
            }
            else {
                return ["$$$", input.toFixed(2)].join("");
            }
        }
    }
})();