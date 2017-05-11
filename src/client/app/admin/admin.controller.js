(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$translatePartialLoader', 'logger'];
    /* @ngInject */
    function AdminController($translatePartialLoader, logger) {
        var vm = this;


        vm.title = 'Admin';

        $translatePartialLoader.addPart('admin');

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();