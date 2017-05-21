(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$translatePartialLoader', 'logger', 'dataservice', '$scope', '$q', '$uibModal', '$rootScope'];
    /* @ngInject */
    function AdminController($translatePartialLoader, logger, dataservice, $scope, $q, $uibModal, $rootScope) {
        var vm = this;


        vm.title = 'Admin';
        vm.crud = 'users';
        vm.users = [];
        vm.usersFilter = [];
        vm.usersFilterPagined = [];
        vm.camtourists = [];
        vm.photos = [];
        vm.cambiarCrud = cambiarCrud;
        vm.editarUsuario= editarUsuario;
        vm.guardarUsuario= guardarUsuario;
        vm.eliminarUsuario= eliminarUsuario;
        vm.leerUsuario = leerUsuario;
        vm.openUserModal = openUserModal;
        vm.closeUserModal = closeUserModal;
        vm.userDetails = {};
        vm.filterUsers = filterUsers;

        $scope.totalItems;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;

        $translatePartialLoader.addPart('admin');

        function setPagingData(page) {
            $scope.currentPage = page;
            var pagedData = vm.usersFilter.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
            vm.usersFilterPagined = pagedData;
        }

        $scope.$watch('currentPage', function () {
            setPagingData($scope.currentPage);
        });

        function cambiarCrud(crud) {
            vm.crud = crud;
        }

        function filterUsers() {
            var filterArray = vm.users;

            if (vm.filterUser.name){
                filterArray = filterArray.filter(function(element){
                    return element.name.indexOf(vm.filterUser.name) !== -1;
                });
            }

            if (vm.filterUser.last_name){
                filterArray = filterArray.filter(function(element){
                    return element.last_name.indexOf(vm.filterUser.last_name) !== -1;
                });
            }

            if (vm.filterUser.email){
                filterArray = filterArray.filter(function(element){
                    return element.email.indexOf(vm.filterUser.email) !== -1;
                });
            }

            if (vm.filterUser.type){
                filterArray = filterArray.filter(function(element){
                    return element.tipo.indexOf(vm.filterUser.type) !== -1;
                });
            }

            vm.usersFilter = filterArray;

            setPagingData($scope.currentPage);
        }

        function getUsers() {
            return dataservice.getUsers().then(function(data) {
                vm.users = data;
                vm.usersFilter = data;
                vm.usersFilterPagined = data;

                $scope.totalItems = vm.usersFilterPagined.length;

                setPagingData($scope.currentPage);
            });
        }

        function editarUsuario(user) {
            openUserModal(user, false);
        }

        function guardarUsuario(user){
          var data = {
              'name': user.name,
              'surname': user.last_name,
              'address': user.address,
              'cp': user.cp,
              'email': user.email,
              'avatar': user.avatar.substring(user.avatar.lastIndexOf('/') + 1),
              'type': user.tipo
          };

          console.log(data);

          dataservice.submitProfile(data).then(function(response) {
              if (response.data) {
                  getUsers();

                  closeUserModal();
              } else {
                  toastr.error('Error, intentelo de nuevo mas tarde', 'Error');
              }
          });
        }

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
            openUserModal(user, true);
        }

        function openUserModal(user, isReadOnly) {
            console.log('modal');
            $rootScope.modalUserInstance = $uibModal.open({
                animation: 'true',
                templateUrl: 'app/admin/modal.user.html',
                controller: 'AdminController',
                controllerAs: 'vm',
                size: 've',
                backdrop: 'static',
                scope: $rootScope
            });
            $rootScope.modalUserInstance.userDetails = user;
            $rootScope.modalUserInstance.userReadOnly = isReadOnly;
            $rootScope.modalUserInstance.guardarUsuario = guardarUsuario;
        }

        function closeUserModal() {
            $rootScope.modalUserInstance.close('a');
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
