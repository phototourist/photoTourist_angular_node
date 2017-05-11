(function() {
    'use strict';

    angular
        .module('app.camtourist')
        .controller('CamtouristController', CamtouristController); // Controlador y Funcion

    CamtouristController.$inject = ['$rootScope', '$translatePartialLoader', 'dataservice', '$q', 'logger', '$scope'];
    /* @ngInject */
    function CamtouristController($rootScope, $translatePartialLoader, dataservice, $q, logger, $scope) {
        var vm = this;
        vm.title = 'Camtourist';

        $translatePartialLoader.addPart('camtourist');

        vm.camtourists = []; //Lista de Localizaciones lateral
        vm.cities = [];
        vm.camtouristsByCity = {};
        vm.markers = [];
        vm.testMarkers = [];
        vm.map = {
            center: {
                latitude: 39.5770969,
                longitude: -3.5280415
            },
            zoom: 12,
            windows: {
                model: {},
                show: false,
                closeClick: closeInfoWindow,
                options: {
                    pixelOffset: {
                        width: -1,
                        height: -20
                    }
                }
            },
            markersEvents: {
                mouseover: mouseOverInfoWindow
            }
        };

        function closeInfoWindow() {
            vm.map.windows.show = false;
        }

        function mouseOverInfoWindow(marker, eventName, model, args) {
            vm.map.windows.model = model;
            vm.map.windows.show = true;
            vm.infoWindow = getCamtouristInfoWindow(model.id);
            marker.showWindow = false;
            marker.visible = true;
        }

        vm.icon = {
            url: '../../images/localizacion_maps.png'
        };


        activate();

        function activate() {
            //var promises = [getCamtourist(), getCities()]; // ahi dentro todas las promesas

            var promises = [getLocation(), getCamtourist(), getCities()]; // ahi dentro todas las promesas
            return $q.all(promises).then(function() {
                logger.info('Activated Camtourist View');
            });
        }

        //Geolocalizamos al usuario inicialmente
        function getLocation() {
            return dataservice.getLocation().then(
                function(data) {
                    console.log(data);
                    vm.map.center = {
                        latitude: data.latitude,
                        longitude: data.longitude
                    };
                });
        }

        //Funcion para cargar inicialmente todos los marcadores y lista
        function getCamtourist() {
            return dataservice.getCamtourist().then(function(data) {
                vm.camtourists = data;
                getMarkers(vm.camtourists);
                getCamtouristsByCity(vm.camtourists);
                return vm.camtourists;
            });


        }

        function getCamtouristsByCity(camtourists) {
            var count = {};
            camtourists.sort(function(camtourist1, camtourist2) {
                return camtourist1.ciudad > camtourist2.ciudad ? 1 : -1;
            });

            for (var camtourist in camtourists) {
                if (count[camtourists[camtourist].ciudad]) {
                    count[camtourists[camtourist].ciudad]++;

                } else { count[camtourists[camtourist].ciudad] = 1; }
            }
            vm.camtouristsByCity = count;
        }

        //Funcion para crear los marcadores totales
        function getMarkers(camtourists) {
            for (var i = 0; i < camtourists.length; i++) {
                var latitud = camtourists[i].latitud;
                var longitud = camtourists[i].longitud;
                //console.log(camtourists[i]);
                //var principal = camtourists[i].principal.data[0];
                var marker = {
                    id: camtourists[i].id,
                    latitude: latitud,
                    longitude: longitud,
                    // principal: principal,
                    icon: vm.icon
                };

                vm.markers.push(marker);
            }
        }

        //Funcion para cargar ciudades en desplegable desde BD
        function getCities() {
            return dataservice.getCities().then(function(data) {

                vm.cities = data;

                return vm.cities;
            });
        }

        //Funcion para mostrar al mapa los marcadores especificos ciudad
        $scope.getCityMap = function() { 
            return dataservice.getCityMap($scope.selectedCities.ciudad).then(function(data) {
                vm.camtourists = data;
                console.log('getCityMap.data = ' + data);
                vm.markers = [];
                getMarkers(vm.camtourists);

                var hasPrincipal = false; //variable para controlar si tenemos Principal en CamTourist BD
                for (var i = 0; i < vm.markers.length; i++) {
                    if (vm.markers[i].principal === 1) {
                        vm.map.center = {
                            latitude: vm.markers[i].latitude,
                            longitude: vm.markers[i].longitude
                        };
                        hasPrincipal = true;
                        break;
                    }
                }

                if (hasPrincipal === false) {
                    vm.map.center = {
                        latitude: vm.markers[0].latitude,
                        longitude: vm.markers[0].longitude

                    };
                }
            });
        };

        function getCamtouristInfoWindow(camtouristId) {
            console.log(vm.camtourists);
            for (var i = 0; i < vm.camtourists.length; i++) {
                if (vm.camtourists[i].id === camtouristId) { return vm.camtourists[i]; }

            }

        }
    }
})();
