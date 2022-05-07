(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['SignUpService'];
    function MyInfoController(SignUpService) {
        var $ctrl = this;
        console.log("gather user info")
        $ctrl.displayUser = {};
        if (SignUpService.getUser() != null) {
            $ctrl.displayUser = SignUpService.getUser();
        }
        console.log($ctrl.displayUser);

        $ctrl.hasUser = function() {
            return this.displayUser.firstName != null;
        }
    }
})();
    