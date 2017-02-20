(function() {
    'use strict';

    angular
        .module('app.camtourist')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'camtourist',
            config: {
                url: '/camtourist',
                templateUrl: 'app/camtourist/camtourist.html',
                controller: 'CamtouristController',
                controllerAs: 'vm',
                title: 'CAMTOURIST',
                settings: {
                    nav: 3,
                    content: '<i class="fa fa-map-marker"></i> Camtourist'
                }
            }
        }];
    }
})();
