(function() {
  'use strict';

  angular
      .module('app.myPhotos')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
            state: 'myPhotos',
        config: {
            url: '/myPhotos',
            templateUrl: 'app/myPhotos/myPhotos.html',
          controller: 'MyPhotosController',
          controllerAs: 'vm',
          title: 'MYPHOTOS'          
        }
      }
    ];
  }
})();
