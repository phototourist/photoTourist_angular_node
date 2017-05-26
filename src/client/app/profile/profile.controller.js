(function() {
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$translatePartialLoader', 'toastr',
        '$rootScope', 'logger', 'dataservice', '$q', '$state'
    ];
    /* @ngInject */
    function ProfileController($translatePartialLoader, toastr,
        $rootScope, logger, dataservice, $q, $state) {
        var vm = this;
        vm.title = 'Profile';
        vm.profileName = '';
        vm.profileSurname = '';
        vm.profileAddress = '';
        vm.profilePostal = '';
        vm.profileEmail = '';
        vm.profileAvatar = '';
        vm.previousAvatar = '';
        vm.newAvatar = '';
        vm.submitProfile = submitProfile;
        Dropzone.autoDiscover = false;
        vm.inputEmail = '';
        vm.uploadPhoto = uploadPhoto;
        vm.saveAvatar = saveAvatar;
        vm.close = close;
        vm.error = false;

        $translatePartialLoader.addPart('profile');

        //Funcion para cargar profile
        function getProfile(email) {
            return dataservice.getProfile(email).then(function(data) {
                vm.profileName = data[0].name;
                vm.profileSurname = data[0].last_name;
                vm.profileAddress = data[0].address;
                vm.profilePostal = data[0].cp;
                vm.profileEmail = data[0].email;
                vm.previousAvatar = data[0].avatar;
                vm.profileAvatar = vm.previousAvatar;

                return [vm.profileName, vm.profileSurname, vm.profileAddress,
                  vm.profilePostal, vm.profileEmail, vm.profileAvatar];
            });
        }

        function submitProfile() {
            var data = {
                'name': vm.profileName,
                'surname': vm.profileSurname,
                'address': vm.profileAddress,
                'cp': vm.profilePostal,
                'email': vm.profileEmail
            };

            if (vm.newAvatar.length == 0) {
                data['avatar'] = vm.previousAvatar;
            } else {
                data['avatar'] = vm.newAvatar;
            }

            console.log(data);

            dataservice.submitProfile(data).then(function(response) {
                if (response.data) {
                    console.log(data.avatar);
                    $rootScope.authUser.avatar = data.avatar;
                    console.log($rootScope.authUser.avatar);
                    vm.profileName = data.name;
                    vm.profileSurname = data.surname;
                    vm.profileAddress = data.address;
                    vm.profilePostal = data.cp;
                    vm.profileAvatar = vm.previousAvatar;

                    //$state.go('dashboard');//ir a modulo MIS FOTOS
                } else {
                    toastr.error('Error, intentelo de nuevo mas tarde', 'Error');
                }
            });
        }

        //Funciones Dropzone
        vm.dzOptions = {
            url: 'api/saveAvatar',
            paramName: 'foto',
            acceptedFiles: 'image/jpeg, images/jpg, image/png',
            addRemoveLinks: true,
            dictDefaultMessage: 'Pulsa o arrastra la foto para tu perfil',
            dictFileTooBig: 'La foto es demasiado grande',
            dictMaxFilesExceeded: 'Solo puede subir una imagen',
            dictRemoveFile: 'Eliminar',
            dictCancelUpload: 'Cancelar',
            uploadMultiple: false,
            parallelUploads: 1,
            maxFiles: 1
        };

        vm.dzCallbacks = {
            'success': function(file, xhr) {
                console.log(xhr);
                vm.newAvatar = xhr.avatar[0].filename;
            },
            'error': function(file, err) {
                console.log(err);
            },
            'removedfile': function(file, err) {
                console.log(err);
                vm.newAvatar = '';
            }
        };

        vm.dzMethods = {};
        vm.removeNewFile = function() {
            vm.dzMethods.removeAllFiles(); //We got $scope.newFile from 'addedfile' event callback
        }

        function uploadPhoto() {
            vm.dzMethods.processQueue();
        }

        function saveAvatar(avatar) {
            console.log(avatar);

            var data = {
                avatar: avatar
            };

            dataservice.saveAvatar(data).then(function(response) {
                console.log(response);
                if (response) {

                } else {
                    vm.class = 'alert alert-success';
                    vm.message = 'Error al cargar foto, vuelva a intentarlo mas tarde';
                }
            });
        }

        activate();

        function activate() {
            var promises = []; // ahi dentro todas las promesas
            if ($rootScope.authUser !== undefined && $rootScope.authUser != null)
            //console.log('$rootScope.authUser.email: ' + $rootScope.authUser.email);
                promises = [getProfile($rootScope.authUser.email)];
            return $q.all(promises).then(function() {
                logger.info('Activated Camtourist View');
            });
        }
    }
})();
