(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$translate', '$translatePartialLoader', 'logger', '$q', '$rootScope', '$state',
        'routerHelper', '$uibModal', 'dataservice', 'toastr'
    ];
    /* @ngInjects */
    function SidebarController($translate, $translatePartialLoader, logger, $q,
        $rootScope, $state, routerHelper, $uibModal, dataservice, toastr) {
        var vm = this;
        var states = routerHelper.getStates();

        vm.isCurrent = isCurrent;
        vm.openModal = openModal;
        //vm.myPhotos = myPhotos;

        vm.setLang = setLang;
        $translatePartialLoader.addPart('layout');

        activate();

        function activate() {
            getNavRoutes();

            var promises = [getAuthUser()];
            return $q.all(promises).then(function() {
                logger.info('Activated layout View');
            });

        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return r.settings && r.settings.nav;
            }).sort(function(r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }


        function getAuthUser() {
            return dataservice.isLoggedin().then(function(data) {
                $rootScope.authUser = data;
                return $rootScope.authUser;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }


        function openModal() {
            console.log('modal');
            $rootScope.modalInstance = $uibModal.open({
                animation: 'true',
                templateUrl: 'app/layout/modal.view.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                size: 'lg'
            });
        }

        //function myPhotos() {
        //    console.log('fotos');
        //    $state.go('myPhotos');

        //}

        function setLang(langKey) {
            // You can change the language during runtime
            $translate.use(langKey);
        }
    }
})();
