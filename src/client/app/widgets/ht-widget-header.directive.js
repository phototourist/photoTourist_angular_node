(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('htWidgetHeader', htWidgetHeader);

  /* @ngInject */
  function htWidgetHeader() {
    //Usage:
    //<div ht-widget-header title="vm.map.title"></div>
    // Creates:
    // <div ht-widget-header=""
    //      title="Movie"
    //      allow-collapse="true" </div>
      var directive = {
          restrict: 'E',
          scope: {
              show: '='
          },
          replace: true, // Replace with the template below
          transclude: true, // we want to insert custom content inside the directive
          link: link,
          templateUrl: 'app/widgets/modal-dialog.html'

      };
    return directive;

    function link(scope, element, attrs) {
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
