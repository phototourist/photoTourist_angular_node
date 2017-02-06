(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      getCamtourist: getCamtourist,
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

  function getCamtourist() {
      console.log('deeo');
      return $http.get('/api/camtourist')
        .then(success)
        .catch(fail);

      function success(response) {
        console.log(response);
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for camtourist')(e);
      }
    }

  function submitSignUp(data){
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

  function login(data){


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
