(function() {
    'use strict';

    angular
        .module('app.myPhotos')
        .controller('MyPhotosController', MyPhotosController);

    MyPhotosController.$inject = ['$scope', '$q', '$translatePartialLoader', 'logger', 'dataservice', '$rootScope', 'toastr'];
    /* @ngInject */
    function MyPhotosController($scope, $q, $translatePartialLoader, logger, dataservice, $rootScope, toastr) {
        var vm = this;
        vm.title = 'MYPHOTOS';
        vm.imagenes = [];
        vm.imagenesSlice = [];
        vm.verFoto = verFoto;
        vm.mostrarModal = false;
        vm.path = '';

        $scope.totalItems;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 4;            
                        
        $translatePartialLoader.addPart('myPhotos');
               

        activate();

        function activate() {            
            
            var promises = [dataservice.isLoggedin()];

            return $q.all(promises).then(function () {  
                getPhotos();
                
               logger.info('Activated myPhotos View');
           });

        }

        function setPagingData(page) {
            $scope.currentPage = page;
            var pagedData = vm.imagenes.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
            vm.imagenesSlice = pagedData;
        }

        $scope.$watch('currentPage', function () {
            setPagingData($scope.currentPage);
        });


        function getPhotos() {
           
            console.log($rootScope.authUser.email);
            var data = {email: $rootScope.authUser.email};

            console.log(data);

            dataservice.getPhotos(data).then(function (response) {
              

                if (response.data.length > 0) {                    
                    vm.imagenes = response.data;                    
                    $scope.totalItems = vm.imagenes.length;
                   
                    setPagingData($scope.currentPage);
                    
                } else {
                     toastr.error('No hay fotos para este usuario', 'Error');

                }
                



            });            
        }

        function verFoto(path) {            

            vm.mostrarModal = !vm.mostrarModal;
            vm.path = path;
            
        }

        
    }
})();