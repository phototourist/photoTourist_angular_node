(function() {
  'use strict';

  angular
    .module('app.layout')
    .factory('commonService', commonService);

  commonService.$inject = ['$rootScope','$timeout', 'logger'];
  /* @ngInject */
  function commonService($rootScope, $timeout, logger) {
    var service = {
      banner: banner
    };
    return service;

    function banner(message, type) {
      console.log("banerrrrr");
      $rootScope.bannerText = message;
      $rootScope.bannerClass = 'alertbanner aletbanner' + type;
      $rootScope.bannerV = true;

      $timeout(function () {
                    $rootScope.bannerV = false;
                    $rootScope.bannerText = "";
                }, 5000);

    }

}
})();
