(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['$translatePartialLoader','dataservice', '$timeout', '$compile'];
  /* @ngInject */
  function ContactController($translatePartialLoader,dataservice, $timeout, $compile) {
      var vm = this;
      vm.title = 'Contact';
      ////////////////////
      vm.inputName = '';
      vm.inputEmail = '';
      vm.inputSubject = '';
      vm.inputMessage = '';
      vm.send = send;
      vm.class = '';

      $translatePartialLoader.addPart('contact');

    function send() {

      var data = {
        name:   vm.inputName,
        from: vm.inputEmail,
        to:  '',
        subject: vm.inputSubject,
        text: vm.inputMessage,
        type: 'admin'
      };
      console.log(data);
//console.log(data);
      dataservice.sendEmail(data).then(function(response) {

        if (response) {

            data.type='user';

            dataservice.sendEmail(data).then(function (response) {

                if (response) {
                  vm.class = 'alert alert-success';
                  vm.message = 'Su email ha sido enviado correctamente';

                  vm.inputName = '';
                  vm.inputEmail = '';
                  vm.inputSubject = '';
                  vm.inputMessage = '';

                  $timeout(function () {

                    vm.contactForm.inputEmail.$error.required = false;
                    vm.contactForm.inputName.$error.required = false;
                    vm.contactForm.inputMessage.$error.required = false;

                  }, 30);

                  $timeout(function () {
                    vm.class = '';
                    vm.message = '';
                  }, 3000);

                } else {
                  vm.class = 'alert alert-success';
                  vm.message = 'Error al enviar el email, vuelva a intentarlo mas tarde';
                }
            });

        } else {
          vm.class = 'alert alert-success';
          vm.message = 'Error al enviar el email, vuelva a intentarlo mas tarde';
        }
      });

    }
  }
})();
