(function() {
    'use strict';

    angular
        .module('app.camtouristDesk')
        .controller('CamtouristDeskController', CamtouristDeskController);

    CamtouristDeskController.$inject = ['$translatePartialLoader', 'logger'];
    /* @ngInject */
    function CamtouristDeskController($translatePartialLoader, logger) {
        var vm = this;
        vm.title = 'CamtouristDesk';
        Dropzone.autoDiscover = false;        
        vm.verCrear = false;
        vm.verSubir = false;
        vm.inputEmail = '';        
        vm.subirFotos = subirFotos;
        var data = {};
        $translatePartialLoader.addPart('camtourisDesk');

        vm.dzOptions = {
            url: 'api/uploadCamtourist',
            //paramName: vm.inputEmail,
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
            'success': function (file, xhr) {
                console.log(file, xhr);
                vm.removeNewFile();
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

            data = { email: vm.inputEmail };                     

            vm.dzOptions = { paramName: data.email };
                
            console.log(data.email);

            vm.dzMethods.processQueue();

        }




        //myDropzone.processQueue()
        activate();

        function activate() {
            logger.info('Activated Camtourist Desk');
        }
    }
})();