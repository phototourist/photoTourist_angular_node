(function() {
    'use strict';

    angular
        .module('app.profile')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'dataservice', '$rootScope'];
    /* @ngInject */
    function appRun(routerHelper, dataservice, $rootScope) {
        routerHelper.configureStates(getStates(dataservice, $rootScope));
    }

    function getStates(dataservice, $rootScope) {
        return [
          {
            state: 'profile',
            config: {
              url: '/profile',
              templateUrl: 'app/profile/profile.html',
              controller: 'ProfileController',
              controllerAs: 'vm',
              title: 'PROFILE',
              /*settings: {
                nav: 10,
                content: '<i class="fa fa-envelope"></i> Contact'
              },*/
              ncyBreadcrumb: {
                  parent: 'dashboard',
                  label: '{{ "BREAD_CONTACT" | translate }}'
              }
            }
          }
        ];
      }
})();
