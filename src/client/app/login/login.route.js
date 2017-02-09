(function() {
  'use strict';

  angular
    .module('app.login')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'signup',
        config: {
          url: '/signup',
          templateUrl: 'app/login/signup.view.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          title: 'signup'
        }
      },
      {
        state: 'successFacebook',
        config: {
          url: '/successFacebook',
          controller: 'SocialController'
        }
      }
    ];
  }
})();
