(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$translatePartialLoader', 'logger', 'dataservice', '$q', '$uibModal', '$rootScope'];
    /* @ngInject */
    function AdminController($translatePartialLoader, logger, dataservice, $q, $uibModal, $rootScope) {
        var vm = this;


        vm.title = 'Admin';
        vm.crud = 'users';
        vm.users = [];
        vm.camtourists = [];
        vm.photos = [];
        vm.cambiarCrud = cambiarCrud;
        vm.userReadOnly = true;
        vm.editarUsuario= editarUsuario;
        vm.eliminarUsuario= eliminarUsuario;
        vm.leerUsuario = leerUsuario;
        vm.openUserModal = openUserModal;
        vm.closeUserModal = closeUserModal;
        vm.userModal = {};

        $translatePartialLoader.addPart('admin');

        function cambiarCrud(crud) {
            vm.crud = crud;
        }

        function getUsers() {
            return dataservice.getUsers().then(function(data) {
                vm.users = data;
            });
        }

        function editarUsuario(user) {}

        function eliminarUsuario(user) {
            var data = {
                'id': user.id
            };
            return dataservice.eliminarUser(data).then(function(data) {
              if (data !== false) {
                  vm.users = vm.users.filter(function(element){
                      return data !== element.id;
                  });
              }
            });
        }

        function leerUsuario(user) {
            vm.userReadOnly = true;
            openUserModal(user);
        }

        function openUserModal(user) {
            console.log('modal');
            $rootScope.modalInstance = $uibModal.open({
                animation: 'true',
                templateUrl: 'app/admin/modal.user.html',
                controller: 'AdminController',
                controllerAs: 'vm',
                size: 'lg'
            });
        }

        function closeUserModal() {
            //console.log("close");
            $rootScope.modalInstance.close('a');
        }

        activate();

        function activate() {
          var promises = [getUsers()]; // ahi dentro todas las promesas
          return $q.all(promises).then(function() {
              logger.info('Activated Admin View');
          });
        }
    }
})();
