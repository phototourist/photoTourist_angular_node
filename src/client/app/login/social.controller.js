(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('SocialController', SocialController);

  SocialController.$inject = ['logger', 'dataservice', 'commonService', '$state'];
  /* @ngInject */
  function SocialController(logger, dataservice, commonService, $state) {

signupFacebook()

  function signupFacebook(){

  console.log("submit");

      dataservice.signupFacebook().then(function (response) {

        console.log(response);
        $state.go('dashboard');
      });
    }



  }
})();
