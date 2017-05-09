
(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$translatePartialLoader', 'toastr', '$uibModal',
        '$rootScope', 'logger', 'dataservice', '$state','$stateParams', '$timeout'
    ];
    /* @ngInject */
    function LoginController($translatePartialLoader, toastr, $uibModal,
        $rootScope, logger, dataservice, $state, $stateParams, $timeout) {
        var vm = this;
        vm.title = 'Login';
        vm.inputEmail = '';
        vm.inputPass = '';
        vm.recoveryEmail = '';
        vm.submitSignUp = submitSignUp;
        vm.login = login;
        vm.close = close;
        vm.error = false;
        vm.showRecovery = false;
        vm.recovery = recovery;
        vm.sendRecovery = sendRecovery;
        vm.submitRecoveryPassword = submitRecoveryPassword;
        vm.inputRecoveryPass1 ='';
        vm.class = '';
        vm.message = '';

        $translatePartialLoader.addPart('login');

        function submitSignUp() {

            var data = {
                'email': vm.inputEmail,
                'pass': vm.inputPass,
            };

            dataservice.submitSignUp(data).then(function(response) {

                if (response.data) {
                    toastr.success('El usuario se ha dado de alta correctamente, revise su correo', 'Alta');
                    $state.go('dashboard');
                } else {
                    toastr.error('Error, intentelo de nuevo mas tarde', 'Error');
                }


            });
        }

        function close() {
            //console.log("close");
            $rootScope.modalInstance.close('a');
        }

        function login() {
            close();
            //console.log("login");
            var data = {
                'email': vm.userEmail,
                'pass': vm.password,
            };
            dataservice.login(data).then(function(response) {
                console.log(response.data);

                if (!response.data.rows) {
                    $rootScope.authUser = false;
                    toastr.error(response.data.inf, 'Error');
                    vm.error = response.data.inf;
                } else {
                    toastr.success(response.data.inf, 'Bienvenido');
                    $rootScope.authUser = response.data.rows;
                    console.log(response.data.rows);
                }

            });
        }

        function recovery() {
            //console.log("recovery");

            vm.showRecovery = true;
        }

        function sendRecovery() {
            //console.log("sendRecovery");

            //Enviar mail al usuario para nueva contraseña
            var data = {
                from: '',
                to: vm.recoveryEmail,
                type: 'modify'
            };

            dataservice.sendChangePassword(data).then(function (response) {
                console.log(response);

                if (response) {
                    vm.inputEmail = '';
                    $timeout(function () {
                        //vm.modal_recovery.recoveryEmail.$error.required = false;
                        close();
                    }, 30);
                    toastr.success('PhotoTourist te ha enviado un correo. Por favor, sigue las indicaciones', 'Recuperar Password');

                } else {
                    vm.class = 'alert alert-success';
                    //vm.message = 'Error al enviar el email, vuelva a intentarlo mas tarde';
                    toastr.error('Error al enviar el email, vuelva a intentarlo mas tarde', 'Error');
                }
            });
        }

        function submitRecoveryPassword() {
          var token = $stateParams.token;
            //console.log("login");
            var data = {
                'pass': vm.inputRecoveryPass1,
                'token':token,
            };
            console.log(data);
            dataservice.recoveryPassword(data).then(function(response) {
              if (response.data) {
                      toastr.success('Su contraseña ha sido modificad correctamente', 'Alta');
                      $state.go('dashboard');
                  } else {
                      toastr.error('Error, intentelo de nuevo mas tarde', 'Error');
                  }
            });
        }

        activate();

        function activate() {
            logger.info('Activated Users View');
        }
    }
})();
