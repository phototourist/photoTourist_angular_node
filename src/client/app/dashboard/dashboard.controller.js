(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$translatePartialLoader', 'logger'];
    /* @ngInject */
    function DashboardController($translatePartialLoader, logger) {
        var vm = this;
        vm.news = {
            title: 'PhotoTourist',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        $translatePartialLoader.addPart('dashboard');

        activate();

        function activate() {
            logger.info('Activated Dashboard View');
        }
        /*
            function getMessageCount() {
              return dataservice.getMessageCount().then(function(data) {
                vm.messageCount = data;
                return vm.messageCount;
              });
            }
        */
        /*
            function getPeople() {
              return dataservice.getPeople().then(function(data) {
                vm.people = data;
                return vm.people;
              });
            }*/
    }
})();