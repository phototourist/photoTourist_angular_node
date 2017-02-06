(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('ModalController', ModalController);

  ModalController.$inject = ['$rootScope', '$timeout', 'dataservice', 'config', 'logger', '$uibModal'];
  /* @ngInject */
  function ModalController($rootScope, $timeout, dataservice, config, logger, $uibModal) {
    var vm = this;
    vm.userEmail = "";
    vm.password = "";
    vm.close = close;
    vm.login = login;

    activate();

    function activate() {

    }


/*
    function close() {
        $rootScope.modalInstance.close('a');
    }

    function login() {

      console.log("login");
          var data = {"email": vm.userEmail,
          "pass": vm.password,
                };

                dataservice.login(data).then(function (response) {

                  console.log(response);

                });

    }*/

  }
})();
