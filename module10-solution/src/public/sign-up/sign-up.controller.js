(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['$scope'];
    function SignUpController($scope) {
      var $ctrl = this;
      /*$ctrl.firstName = "";
      $ctrl.lastName = "";
      $ctrl.email = "";
      $ctrl.phone = "";
      $ctrl.favItem = "";*/
      // Remove before submitting!
      $ctrl.firstName = "John";
      $ctrl.lastName = "Doe";
      $ctrl.email = "test@test.com";
      $ctrl.phone = "123-123-1234";
      $ctrl.favItem = "A7";
      $ctrl.submit = function() {
        console.log(this.firstName);
        console.log(this.lastName);
        console.log(this.email);
        console.log(this.phone);
        console.log(this.favItem);
      }
    }
    
    
    })();
    