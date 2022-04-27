(function () {
'use strict';

angular.module('MenuApp')
.component('categoryList', {
  templateUrl: 'src/categorylist/templates/categorylist.template.html',
  bindings: {
    items: '<'
  }
});

})();
