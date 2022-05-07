(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['SignUpService', 'MenuService'];
    function SignUpController(SignUpService, MenuService) {
        var $ctrl = this;
        $ctrl.firstName = "";
        $ctrl.lastName = "";
        $ctrl.email = "";
        $ctrl.phone = "";
        $ctrl.favItem = "";
        $ctrl.shortNames = [];
        $ctrl.userSaved = false;
        var prm = MenuService.getMenu();
        prm.then(function(response){
            $ctrl.shortNames = response.menu_items.map( item => item.short_name);
        })
        .catch(function(error){
            console.log("Could not reach server");
        });
        $ctrl.submit = function() {
            var promise = MenuService.getItem($ctrl.favItem);
            promise.then(function (response) {
                var user = {
                    firstName: $ctrl.firstName,
                    lastName: $ctrl.lastName,
                    email: $ctrl.email,
                    phone: $ctrl.phone,
                    favItem: $ctrl.favItem,
                    itemName: response.name,
                    itemDescription: response.description,
                    itemHasImage: response.image_present
                }
                SignUpService.storeUser(user);
                $ctrl.userSaved = true;
            })
            .catch(function (error) {
                console.log("Invalid selection");
            });
        }
        $ctrl.checkItem = function() {
            return !this.shortNames.includes(($ctrl.favItem).toUpperCase());
        }

    }
})();
    