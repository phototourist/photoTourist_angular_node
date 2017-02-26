(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[PhotoTourist Error] ',
        appTitle: 'PhotoTourist'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$translatePartialLoaderProvider', '$translateProvider',
        '$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'
    ];

    //FUNCIONES TRADUCCION
    function configure($translatePartialLoaderProvider, $translateProvider,
        $logProvider, routerHelperProvider, exceptionHandlerProvider) {

        $translateProvider.registerAvailableLanguageKeys(['ca', 'en', 'es'], {
            'ca-ES': 'ca',
            'es-ES': 'es',
            'en-US': 'en',
            'en-UK': 'en'
        });
        /*$translateProvider.useStaticFilesLoader({
          prefix: '/app/core/i18n/',
          suffix: '.json'
        });*/

        $translatePartialLoaderProvider.addPart('core');
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '/i18n/{part}/{lang}.json', //'/app/{part}/i18n/{lang}.json',
            loadFailureHandler: 'MyErrorHandler'
        });
        $translateProvider.useCookieStorage();

        $translateProvider
            .determinePreferredLanguage()
            .fallbackLanguage('es')
            //.useSanitizeValueStrategy('sanitize');
            .useSanitizeValueStrategy(null);
        //
        /* @ngInject */
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({
            docTitle: config.appTitle + ': '
        });
    }

})();