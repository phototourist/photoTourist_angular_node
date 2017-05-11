(function() {
  'use strict';

  angular
    .module('app.widgets')
      .directive('modalDialog', modalDialog);

  //modalDialog.$inject = [];
  /* @ngInject */
  function modalDialog() {
    //Usage:
    //<img ht-img-person="{{person.imageSource}}"/>
     
    var directive = {
        restrict: 'E',
        scope: {
            show: '=',
            path: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: link,
        templateUrl: 'app/widgets/modal-dialog.html'

    };

    return directive;

    function link(scope, element, attrs) {   
        console.log(attrs);
        scope.dialogStyle = {};
        if (attrs.width)
            scope.dialogStyle.width = attrs.width;
        if (attrs.height)
            scope.dialogStyle.height = attrs.height;
        scope.hideModal = function () {
            scope.show = false;
        };
    }
  }

})();

