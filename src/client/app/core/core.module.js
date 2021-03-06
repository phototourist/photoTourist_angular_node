(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize', 'ngCookies', 'LocalStorageModule',
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus', 'ui.bootstrap', 'pascalprecht.translate',
            'ncy-angular-breadcrumb','thatisuday.dropzone'
        ])
        //Factoria para detectar los errores en la traduccion
        .factory('MyErrorHandler', function($q, $log) {
            return function(part, lang, response) {
                $log.error('The "' + part + '/' + lang + '" part was not loaded. ' + response);
                return $q.when({});
            };
        })

    //Funcion para realizar las traducciones
    .run(function($rootScope, $translate) {
        $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
            console.log('TRANSLATE REFRESH');
            $translate.refresh();
        });
    });
})();
