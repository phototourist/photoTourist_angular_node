(function() {
    'use strict';

    angular
        .module('app.camtourist')
        .controller('CamtouristController', CamtouristController); // Controlador y Funcion

    CamtouristController.$inject = ['dataservice', '$q', 'logger', '$scope'];
    /* @ngInject */
    function CamtouristController(dataservice, $q, logger, $scope) {
        var vm = this;
        vm.title = 'yey';
        vm.camtourists = []; //Lista de Localizaciones lateral
        vm.cities = [];
        vm.markers = [];
        vm.testMarkers = [];
        //vm.onClick = onClick;
        vm.map = {
            center: {
                latitude: 39.5770969,
                longitude: -3.5280415
            },
            zoom: 12,
            windows: {
               model: {},
                show: false,
                options: {
                    pixelOffset: {
                        width: -1,
                        height: -20
                    }
                }
            },
            markersEvents: {
                click: function(marker, eventName, model, args) {
                  console.log("Estoy Clickando!!");
                    vm.map.windows.model = model;
                    vm.map.windows.show = true;
                    vm.infoWindow = "INFORMACION DE INFOWINDOW";
                    //vm.infoWindow = getMenu(model.id);
                    //vm.infoWindow = getCities();
                },

            }
        };

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
                    vm.map.center = {
                            latitude: data.latitude,
                            longitude: data.longitude
                    };
                });
        }

        //Funcion para cargar inicialmente todos los marcadores y lista
        function getCamtourist() {
            return dataservice.getCamtourist().then(function(data) {

              console.log("Devolucion datos getCamtourist " + data);

                vm.camtourists = data;
                getMarkers(vm.camtourists);
                return vm.camtourists;
            });
        }

        //Funcion para crear los marcadores totales
        function getMarkers(camtourists) {
            for (var i = 0; i < camtourists.length; i++) {
                var latitud = camtourists[i].latitud;
                var longitud = camtourists[i].longitud;
                var principal = camtourists[i].principal.data[0];
                var marker = {
                    id: i,
                    latitude: latitud,
                    longitude: longitud,
                    principal: principal,
                    icon: vm.icon
                };
                vm.markers.push(marker);
            }
        }

        //Funcion para cargar ciudades en desplegable desde BD
        function getCities() {
            return dataservice.getCities().then(function(data) {
                console.log("Las Ciudades" + data);
                vm.cities = data;

                return vm.cities;
            });
        }

        //Funcion para mostrar al mapa los marcadores especificos ciudad
        $scope.getCityMap = function() { //Preguntar a PERE el Scope
            return dataservice.getCityMap($scope.selectedCities.ciudad).then(function(data) {
                vm.camtourists = data;
                console.log('getCityMap.data = ' + data);
                vm.markers = [];
                getMarkers(vm.camtourists);

                var hasPrincipal = false; //variable para controlar si tenemos Principal en CamTourist BD
                for (var i = 0; i < vm.markers.length; i++) {
                    if (vm.markers[i].principal == 1) {
                        vm.map.center = {
                                latitude: vm.markers[i].latitude,
                                longitude: vm.markers[i].longitude
                            }
                        hasPrincipal = true;
                        break;
                    }
                }

                if (hasPrincipal == false) {
                    vm.map.center = {
                            latitude: vm.markers[0].latitude,
                            longitude: vm.markers[0].longitude

                    };
                }
            });
        };
    }
})();
