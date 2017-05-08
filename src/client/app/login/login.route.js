(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'dataservice', '$rootScope', '$uibModal'];
    /* @ngInject */
    function appRun(routerHelper, dataservice, $rootScope, $uibModal) {
        routerHelper.configureStates(getStates(dataservice, $rootScope, $uibModal));
    }

    function getStates(dataservice, $rootScope, $uibModal) {
        return [{
            state: 'signup',
            config: {
                url: '/signup',
                templateUrl: 'app/login/signup.view.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                title: 'signup'
            }
        }, {
            state: 'successSocial',
            config: {
                url: '/successSocial',
                controller: 'LoginController',
                resolve: {
                    facebook: dataservice.signupSocial
                }
            }
        },
        {
          state: 'recovery',
          config: {
            url: '/recovery',
            templateUrl: 'app/login/recovery.view.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            title: 'PROFILE',
            ncyBreadcrumb: {
                //parent: 'profile',
                label: '{{ "BREAD_RECOVERY" | translate }}'
            }
          }
        }];
    }
})();
