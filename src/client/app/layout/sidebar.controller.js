(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$rootScope', '$state', 'routerHelper', '$uibModal', 'dataservice', 'toastr'];
  /* @ngInject */
  function SidebarController($rootScope, $state, routerHelper, $uibModal, dataservice, toastr) {
    var vm = this;
    var states = routerHelper.getStates();
  
    vm.isCurrent = isCurrent;
    vm.openModal = openModal;

    activate();

    function activate() { getNavRoutes(); }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }


      function openModal() {
        console.log('modal');
      $rootScope.modalInstance = $uibModal.open({
          animation: 'true',
          templateUrl: 'app/layout/modal.view.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          size: 'lg'

      });
  };


/*
function login() {
  close();
  console.log("login");
    var data = {"email": vm.userEmail,
    "pass": vm.password,
          };
          dataservice.login(data).then(function (response) {
            console.log(response.data);

            if (!response.data.rows) {
              $rootScope.authUser = false;
                toastr.error(response.data.inf, "Error");
            }else {
              toastr.success(response.data.inf, "Alta");
                $rootScope.authUser = response.data.rows;
                console.log(response.data.rows);
            }

          });
}*/



  }
})();
