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
        vm.profileName= '';
        vm.profileSurname= '';
        vm.profileAdress= '';
        vm.profilePostal= '';
        vm.profileEmail = '';
        vm.submitProfile = submitProfile;
        vm.close = close;
        vm.error = false;

        $translatePartialLoader.addPart('profile');

        function submitProfile() {
            var data = {
                'name': vm.profileName,
                'surname': vm.profileSurname,
                'adress': vm.profileAdress,
                'cp': vm.profilePostal,
                'email': vm.profileEmail,
            };

            console.log(data);

            dataservice.submitProfile(data).then(function(response) {
                if (response.data) {
                    $state.go('dashboard');//ir a modulo MIS FOTOS
                } else {
                    toastr.error('Error, intentelo de nuevo mas tarde', 'Error');
                }
            });
        }

        //Funcion para cargar profile
        function getProfile(email) {
            return dataservice.getProfile(email).then(function(data) {
                vm.profileName= data[0].name;
                vm.profileSurname= data[0].last_name;
                vm.profileAdress= data[0].address;
                vm.profilePostal= data[0].cp;
                vm.profileEmail = data[0].email;

                return [vm.profileName, vm.profileSurname, vm.profileAdress, vm.profilePostal, vm.profileEmail];
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
