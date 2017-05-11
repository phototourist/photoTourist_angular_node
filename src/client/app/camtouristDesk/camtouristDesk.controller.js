(function () {
    'use strict';

    angular
        .module('app.camtouristDesk')
        .controller('CamtouristDeskController', CamtouristDeskController);

    CamtouristDeskController.$inject = ['$translatePartialLoader', 'logger', 'dataservice', '$timeout'];
    /* @ngInject */
    function CamtouristDeskController($translatePartialLoader, logger, dataservice, $timeout) {
        var vm = this;
        vm.title = 'CamtouristDesk';
        Dropzone.autoDiscover = false;
        vm.verCrear = false;
        vm.verSubir = false;
        vm.inputEmail = '';
        vm.subirFotos = subirFotos;
        vm.guardarFotosUsuario = guardarFotosUsuario;

        $translatePartialLoader.addPart('camtourisDesk');

        vm.dzOptions = {
            url: 'api/uploadCamtourist',
            paramName: 'foto',
            maxFilesize: '10',
            acceptedFiles: 'image/jpeg, images/jpg, image/png',
            addRemoveLinks: true,
            dictDefaultMessage: 'Pulsa o arrastra las fotos que quieras subir',
            dictFileTooBig: 'La foto es demasiado grande',
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 10

        };

        vm.dzCallbacks = {
            'addedfile': function (file) {
                vm.newFile = file;
            },
            'successmultiple': function (file, xhr) {
                console.log(xhr);
                vm.removeNewFile();
                vm.guardarFotosUsuario(xhr.fotos);
            },
            'error': function (file, err) {
                console.log(err);

            }
        };

        vm.dzMethods = {};
        vm.removeNewFile = function () {
            vm.dzMethods.removeAllFiles(); //We got $scope.newFile from 'addedfile' event callback
        }

        function subirFotos() {

            vm.dzMethods.processQueue();

        }

        function guardarFotosUsuario(fotos) {

            console.log(fotos);

            var data = {
                fotos: fotos,
                from: '',
                to: vm.inputEmail,
                type: 'camtourist'
            };
                
            dataservice.guardarFotosUsuario(data).then(function (response) {
                console.log(response);

                        if (response) {

                            vm.inputEmail = '';
                            $timeout(function () {

                                //vm.camtouristView.inputEmail.$error.required = false;
                                vm.camtouristView.inputEmail.$error.required = false;

                            }, 30);                          
                            

                        } else {
                            vm.class = 'alert alert-success';
                            vm.message = 'Error al enviar el email, vuelva a intentarlo mas tarde';
                        }
                    });

               
           

        }




        //myDropzone.processQueue()
        activate();

        function activate() {
            logger.info('Activated Camtourist Desk');
        }
    }
})();