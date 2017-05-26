(function() {
    'use strict';

    angular
        .module('app.profile')
        .run(appRun);

    appRun.$inject = ['routerHelper', '$translatePartialLoader', 'dataservice', '$rootScope'];
    /* @ngInject */
    function appRun(routerHelper, translatePartialLoader, dataservice, $rootScope) {
        routerHelper.configureStates(getStates(dataservice, translatePartialLoader, $rootScope));
    }

    function getStates(dataservice, translatePartialLoader, $rootScope) {
        return [
          {
            state: 'profile',
            config: {
              url: '/profile',
              templateUrl: 'app/profile/profile.html',
              controller: 'ProfileController',
              controllerAs: 'vm',
              title: 'PROFILE',
              ncyBreadcrumb: {
                  parent: 'dashboard',
                  label: '{{ "BREAD_PROFILE" | translate }}'
              }
            }
          }
        ];
      }
})();
