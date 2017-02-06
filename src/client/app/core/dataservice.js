(function() {
        'use strict';

        angular
            .module('app.core')
            .factory('dataservice', dataservice);
        dataservice.$inject = ['$window', '$http', '$q', 'exception', 'logger'];
        /* @ngInject */

        function dataservice($window, $http, $q, exception, logger) {
            var service = {
                getCamtourist: getCamtourist2,
                getCities: getCities2,
                getCityMap: getCityMap2,
                getLocation: getLocation2,
                sendEmail: sendEmail,
                submitSignUp: submitSignUp,
                login: login
            };
            return service;

            function sendEmail(data) {

                return $http.post('/api/sendmail', data)
                    .then(success)
                    .catch(fail);

                function success() {
                    return true;
                }

                function fail() {
                    return false;
                }
            }

            function getMessageCount() {
                return $q.when(72);
            }

            //Funcion para geolocalizar
            function getLocation2() {
                var deferred = $q.defer(); //iniciamos una promesa para que no de error cuando no tenga dissolve-animation
                if (!$window.navigator.geolocation) {
                    deferred.reject('Geolocation not suported');
                } else {
                    $window.navigator.geolocation.getCurrentPosition(
                        function(position) {
                            var myPosition = {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            };
                            deferred.resolve(myPosition);
                        }, //SI es bueno inyectamos posicion

                        function(err) { //NO es bueno inyectamos error
                            deferred.reject(err);
                        });
                }
                return deferred.promise;
            }

            //Función para coger la lista de Localizaciones
            function getCities2() {
                return $http.get('/api/camtouristCities')
                    .then(success)
                    .catch(fail);

                function success(response) {
                    return response.data;
                }

                function fail(e) {
                    return exception.catcher('XHR Failed for cities')(e);
                }
            }

            //Función para mostrar marcadores según ciudad
            function getCityMap2(ciudad) {
                return $http.get('/api/camtourist/' + ciudad)
                    .then(success)
                    .catch(fail);

                function success(response) {
                    return response.data;
                }

                function fail(e) {
                    return exception.catcher('XHR Failed for camtouristCiudad')(e);
                }
            }

            function getCamtourist2() { //Función para coger la lista de Localizaciones
                return $http.get('/api/camtourist')
                    .then(success)
                    .catch(fail);

                function success(response) {
                    console.log("Localizaciones_GetCamtourist: " + response);

                    return response.data;
                }

                function fail(e) {
                    return exception.catcher('XHR Failed for camtourist')(e);
                }
            }

                function submitSignUp(data) {
                    console.log("dataservice " + data);
                    return $http.post('/api/signup', data)
                        .then(success)
                        .catch(fail);

                    function success(response) {
                        console.log(response);
                        return response;
                    }

                    function fail() {
                        return false;
                    }
                }

                function login(data) {


                    return $http.post('/api/login', data)
                        .then(success)
                        .catch(fail);

                    function success(response) {
                        console.log(response);
                        //  alert(response.data);
                        return response;
                    }

                    function fail() {
                        return false;
                    }
                }
          }
        })();
