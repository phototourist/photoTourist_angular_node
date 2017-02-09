(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['logger', 'dataservice', 'commonService', '$state'];
  /* @ngInject */
  function LoginController(logger, dataservice, commonService, $state) {
    var vm = this;
    vm.title = 'Login';
    vm.inputEmail = "";
    vm.inputPass = "";
    vm.submitSignUp = submitSignUp;



    function submitSignUp(){

  console.log("submit");
      var data = {"email": vm.inputEmail,
      "pass": vm.inputPass,
            };

      dataservice.submitSignUp(data).then(function (response) {

        if (response.data) {
          console.log("tete" +response);
                    $state.go('dashboard');
                    commonService.banner("El usuario se ha dado de alta correctamente, revisa su correo para activarlo", "");

            }else {
              console.log('fatal');
            }


      });
    }


    activate();

    function activate() {
      logger.info('Activated Users View');
    }
  }
})();
