(function() {
  'use strict';

  var widgets = angular.module('app.widgets');

  //Google maps configuration
 widgets.config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        //  key:'AIzaSyBR-8gQxDQ9y5A6JrC1M0cRUoT7Eh9p_-M',
          v: '3.26', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  });

})();
