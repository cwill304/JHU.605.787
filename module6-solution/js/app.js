(function() {
    "use strict";
    angular.module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);
    LunchCheckController.$inject = ["$scope"];
    function LunchCheckController ($scope) {
        $scope.lunchInput = "";
        $scope.lunchOutput = "Waiting on input. Empty items do NOT count!";
        $scope.handleLunchClick = function () {
            let inputToVerify = $scope.lunchInput;
            if (!inputToVerify) {
                $scope.lunchOutput = "Please enter data first";
                $scope.messageColorClass = "redText";
                $scope.inputBorderClass = "redBorder";
            }
            else {
                let delimited = inputToVerify.split(",")
                .filter( value => value.trim().length > 0);
                let output = delimited.length > 3 ? "Too much!" : "Enjoy";
                $scope.lunchOutput = output;
                $scope.messageColorClass = "greenText";
                $scope.inputBorderClass = "greenBorder";
            }
        }
    }
})();