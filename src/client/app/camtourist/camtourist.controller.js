(function() {
  'use strict';

  angular
    .module('app.camtourist')
    .controller('CamtouristController', CamtouristController);

  CamtouristController.$inject = ['dataservice', '$q', 'logger'];
  /* @ngInject */
  function CamtouristController(dataservice, $q, logger) {
    var vm = this;
    vm.title = 'yey';
    vm.camtourist = [];

    vm.map = {
      center: {
        latitude: 39.5770969,
        longitude: -3.5280415
      },
      zoom: 6
    };

    vm.marker = {
      id: 0,
      coords: {
        latitude: 38.820336,
        longitude: -0.608028
      },
      options: {
        draggable: true
      }
    };

     activate();

      function activate() {
      var promises = [getCamtourist()];
      return $q.all(promises).then(function() {
        logger.info('Activated Camtourist View');
      });
    }

 function getCamtourist() {
   console.log( 'deeo');
      return dataservice.getCamtourist().then(function(data) {
        console.log(data + 'deeo');
        vm.camtourist = data;
        return vm.messageCount;
      });
    }

  }
})();
