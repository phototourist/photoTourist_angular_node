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

        $translatePartialLoader.addPart('camtourisDesk');

        vm.dzOptions = {
            url: '/uploadCamtourist',
            paramName: 'foto',
            maxFilesize: '10',
            acceptedFiles: 'image/jpeg, images/jpg, image/png',
            addRemoveLinks: true,  
            dictDefaultMessage: 'Pulsa o arrastra las fotos que quieras subir',
            dictFileTooBig: 'La foto es demasiado grande'
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
            vm.dzMethods.removeFile(vm.newFile); //We got $scope.newFile from 'addedfile' event callback
        }



        

        activate();

        function activate() {
            logger.info('Activated Camtourist Desk');
        }
    }
})();