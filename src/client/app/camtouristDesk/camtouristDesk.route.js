(function() {
  'use strict';

  angular
    .module('app.camtouristDesk')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'camtouristDesk',
        config: {
          url: '/camtouristDesk',
          templateUrl: 'app/camtouristDesk/camtouristDesk.html',
          controller: 'CamtouristDeskController',
          controllerAs: 'vm',
          title: 'CAMTOURIST DESK',
         
        }
      }
    ];
  }
})();
