/**
 * helloWorld - helloWorld Project Generated from HotTowel Angular
 * @authors 
 * @version v0.0.0
 * @link 
 * @license 
 */
!function(){"use strict";angular.module("app",["app.core","app.widgets","app.admin","app.dashboard","app.camtourist","app.layout","app.contact","app.login"])}(),function(){"use strict";angular.module("app.admin",["app.core","app.widgets"])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}(),function(){"use strict";angular.module("app.camtourist",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.contact",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngSanitize","blocks.exception","blocks.logger","blocks.router","ui.router","ngplus","ui.bootstrap"])}(),function(){"use strict";angular.module("app.dashboard",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.layout",["app.core","ui.bootstrap.collapse","ngAnimate"])}(),function(){"use strict";angular.module("app.login",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.widgets",["uiGmapgoogle-maps"])}(),function(){"use strict";function t(t){function i(){t.info("Activated Admin View")}var e=this;e.title="Admin",i()}angular.module("app.admin").controller("AdminController",t),t.$inject=["logger"]}(),function(){"use strict";function t(t){t.configureStates(i())}function i(){return[{state:"admin",config:{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"vm",title:"Admin",settings:{nav:2,content:'<i class="fa fa-lock" ></i> Admin'}}}]}angular.module("app.admin").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(){this.config={appErrorPrefix:void 0},this.configure=function(t){this.config.appErrorPrefix=t},this.$get=function(){return{config:this.config}}}function i(t){t.decorator("$exceptionHandler",e)}function e(t,i,e){return function(a,o){var n=i.config.appErrorPrefix||"",s={exception:a,cause:o};a.message=n+a.message,t(a,o),e.error(a.message,s)}}angular.module("blocks.exception").provider("exceptionHandler",t).config(i),i.$inject=["$provide"],e.$inject=["$delegate","exceptionHandler","logger"]}(),function(){"use strict";function t(t,i){function e(e){return function(a){var o,n;return a.data&&a.data.description&&(o="\n"+a.data.description,n=e+o),a.data.description=n,i.error(n),t.reject(a)}}var a={catcher:e};return a}t.$inject=["$q","logger"],angular.module("blocks.exception").factory("exception",t)}(),function(){"use strict";function t(t,i){function e(e,a,o){i.error(e,o),t.error("Error: "+e,a)}function a(e,a,o){i.info(e,o),t.info("Info: "+e,a)}function o(e,a,o){i.success(e,o),t.info("Success: "+e,a)}function n(e,a,o){i.warning(e,o),t.warn("Warning: "+e,a)}var s={showToasts:!0,error:e,info:a,success:o,warning:n,log:t.log};return s}angular.module("blocks.logger").factory("logger",t),t.$inject=["$log","toastr"]}(),function(){"use strict";function t(t,i,e){function a(t,a,n,s){function r(t,a){t.forEach(function(t){t.config.resolve=angular.extend(t.config.resolve||{},o.resolveAlways),i.state(t.state,t.config)}),a&&!m&&(m=!0,e.otherwise(a))}function l(){a.$on("$stateChangeError",function(i,e,a,o,n,r){if(!p){g.errors++,p=!0;var l=e&&(e.title||e.name||e.loadedTemplateUrl)||"unknown target",c="Error routing to "+l+". "+(r.data||"")+". <br/>"+(r.statusText||"")+": "+(r.status||"");s.warning(c,[e]),t.path("/")}})}function c(){l(),d()}function u(){return n.get()}function d(){a.$on("$stateChangeSuccess",function(t,i,e,n,s){g.changes++,p=!1;var r=o.docTitle+" "+(i.title||"");a.title=r})}var p=!1,m=!1,g={errors:0,changes:0},v={configureStates:r,getStates:u,stateCounts:g};return c(),v}var o={docTitle:void 0,resolveAlways:{}};window.history&&window.history.pushState||(window.location.hash="/"),t.html5Mode(!0),this.configure=function(t){angular.extend(o,t)},this.$get=a,a.$inject=["$location","$rootScope","$state","logger"]}angular.module("blocks.router").provider("routerHelper",t),t.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function t(t,i,e,a){function o(){m.map.windows.show=!1}function n(t,i,e,a){m.map.windows.model=e,m.map.windows.show=!0,m.infoWindow=p(e.id),t.showWindow=!1,t.visible=!0}function s(){var t=[r(),l(),d()];return i.all(t).then(function(){e.info("Activated Camtourist View")})}function r(){return t.getLocation().then(function(t){m.map.center={latitude:t.latitude,longitude:t.longitude}})}function l(){return t.getCamtourist().then(function(t){return m.camtourists=t,u(m.camtourists),c(m.camtourists),m.camtourists})}function c(t){var i={};t.sort(function(t,i){return t.ciudad>i.ciudad?1:-1});for(var e in t)i[t[e].ciudad]?i[t[e].ciudad]++:i[t[e].ciudad]=1;m.camtouristsByCity=i}function u(t){for(var i=0;i<t.length;i++){var e=t[i].latitud,a=t[i].longitud,o=t[i].principal.data[0],n={id:t[i].id,latitude:e,longitude:a,principal:o,icon:m.icon};m.markers.push(n)}}function d(){return t.getCities().then(function(t){return m.cities=t,m.cities})}function p(t){console.log(m.camtourists);for(var i=0;i<m.camtourists.length;i++)if(m.camtourists[i].id===t)return m.camtourists[i]}var m=this;m.title="yey",m.camtourists=[],m.cities=[],m.camtouristsByCity={},m.markers=[],m.testMarkers=[],m.map={center:{latitude:39.5770969,longitude:-3.5280415},zoom:12,windows:{model:{},show:!1,closeClick:o,options:{pixelOffset:{width:-1,height:-20}}},markersEvents:{mouseover:n}},m.icon={url:"../../images/localizacion_maps.png"},s(),a.getCityMap=function(){return t.getCityMap(a.selectedCities.ciudad).then(function(t){m.camtourists=t,console.log("getCityMap.data = "+t),m.markers=[],u(m.camtourists);for(var i=!1,e=0;e<m.markers.length;e++)if(1===m.markers[e].principal){m.map.center={latitude:m.markers[e].latitude,longitude:m.markers[e].longitude},i=!0;break}i===!1&&(m.map.center={latitude:m.markers[0].latitude,longitude:m.markers[0].longitude})})}}angular.module("app.camtourist").controller("CamtouristController",t),t.$inject=["dataservice","$q","logger","$scope"]}(),function(){"use strict";function t(t){t.configureStates(i())}function i(){return[{state:"camtourist",config:{url:"/camtourist",templateUrl:"app/camtourist/camtourist.html",controller:"CamtouristController",controllerAs:"vm",title:"Camtourist",settings:{nav:3,content:'<i class="fa fa-map-marker"></i> Camtourist'}}}]}angular.module("app.camtourist").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t,i,e){function a(){var e={name:o.inputName,from:o.inputEmail,to:"",subject:o.inputSubject,text:o.inputMessage,type:"admin"};console.log(e),t.sendEmail(e).then(function(a){a?(e.type="user",t.sendEmail(e).then(function(t){t?(o["class"]="alert alert-success",o.message="Su email ha sido enviado correctamente",o.inputName="",o.inputEmail="",o.inputSubject="",o.inputMessage="",i(function(){o.contactForm.inputEmail.$error.required=!1,o.contactForm.inputName.$error.required=!1,o.contactForm.inputMessage.$error.required=!1},30),i(function(){o["class"]="",o.message=""},3e3)):(o["class"]="alert alert-success",o.message="Error al enviar el email, vuelva a intentarlo mas tarde")})):(o["class"]="alert alert-success",o.message="Error al enviar el email, vuelva a intentarlo mas tarde")})}var o=this;o.title="Contact",o.inputName="",o.inputEmail="",o.inputSubject="",o.inputMessage="",o.send=a,o["class"]=""}angular.module("app.contact").controller("ContactController",t),t.$inject=["dataservice","$timeout","$compile"]}(),function(){"use strict";function t(t){t.configureStates(i())}function i(){return[{state:"contact",config:{url:"/contact",templateUrl:"app/contact/contact.html",controller:"ContactController",controllerAs:"vm",title:"Contact",settings:{nav:3,content:'<i class="fa fa-envelope"></i> Contact'}}}]}angular.module("app.contact").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(t){t.options.timeOut=4e3,t.options.positionClass="toast-bottom-right"}function i(t,i,e){t.debugEnabled&&t.debugEnabled(!0),e.configure(a.appErrorPrefix),i.configure({docTitle:a.appTitle+": "})}var e=angular.module("app.core");e.config(t),t.$inject=["toastr"];var a={appErrorPrefix:"[PhotoTourist Error] ",appTitle:"PhotoTourist"};e.value("config",a),e.config(i),i.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t){var e="/404";t.configureStates(i(),e)}function i(){return[{state:"404",config:{url:"/404",templateUrl:"app/core/404.html",title:"404"}}]}t.$inject=["routerHelper"],angular.module("app.core").run(t)}(),function(){"use strict";function t(t,i,e,a,o,n,s){function r(t){function e(){return!0}function a(){return!1}return i.post("/api/sendmail",t).then(e)["catch"](a)}function l(){var i=e.defer();return t.navigator.geolocation?t.navigator.geolocation.getCurrentPosition(function(t){var e={latitude:t.coords.latitude,longitude:t.coords.longitude};i.resolve(e)},function(t){i.reject(t)}):i.reject("Geolocation not suported"),i.promise}function c(){function t(t){return t.data}function e(t){return a.catcher("XHR Failed for cities")(t)}return i.get("/api/camtouristCities").then(t)["catch"](e)}function u(t){function e(t){return t.data}function o(t){return a.catcher("XHR Failed for camtouristCiudad")(t)}return i.get("/api/camtourist/"+t).then(e)["catch"](o)}function d(){function t(t){return t.data}function e(t){return a.catcher("XHR Failed for camtourist")(t)}return i.get("/api/camtourist").then(t)["catch"](e)}function p(t){function e(t){return console.log(t),t}function a(){return!1}return i.post("/api/signup",t).then(e)["catch"](a)}function m(t){function e(t){return console.log(t),t}function a(){return!1}return i.post("/api/login",t).then(e)["catch"](a)}function g(){function t(t){return"0"===t.data?(n.authUser=!1,!1):(n.authUser=t.data,t.data)}function e(t){return a.catcher("XHR Failed for /api/loggedin")(t)}return i.get("/api/loggedin").then(t)["catch"](e)}function v(){function t(t){return t.data?(n.authUser=t.data,console.log(t.data),s.go("dashboard"),t.data):(n.authUser=!1,!1)}function e(t){return a.catcher("XHR Failed for /auth/facebook")(t)}return i.get("/auth/success").then(t)["catch"](e)}var f={getCamtourist:d,getCities:c,getCityMap:u,getLocation:l,sendEmail:r,submitSignUp:p,login:m,signupSocial:v,isLoggedin:g};return f}angular.module("app.core").factory("dataservice",t),t.$inject=["$window","$http","$q","exception","logger","$rootScope","$state"]}(),function(){"use strict";function t(t,i,e){function a(){}var o=this;o.news={title:"PhotoTourist",description:"Hot Towel Angular is a SPA template for Angular developers."},o.messageCount=0,o.people=[],o.title="Dashboard",a()}angular.module("app.dashboard").controller("DashboardController",t),t.$inject=["$q","dataservice","logger"]}(),function(){"use strict";function t(t){t.configureStates(i())}function i(){return[{state:"dashboard",config:{url:"/",templateUrl:"app/dashboard/dashboard.html",controller:"DashboardController",controllerAs:"vm",title:"dashboard",settings:{nav:1,content:'<i class="fa fa-dashboard"></i> Dashboard'}}}]}angular.module("app.dashboard").run(t),t.$inject=["routerHelper"]}(),function(){"use strict";function t(){function t(t){t.isCollapsed=!0}var i={bindToController:!0,controller:t,controllerAs:"vm",restrict:"EA",scope:{navline:"="},templateUrl:"app/layout/ht-top-nav.html"};return t.$inject=["$scope"],i}angular.module("app.layout").directive("htTopNav",t)}(),function(){"use strict";function t(t,i,e,a){function o(){a.success(e.appTitle+" loaded!",null),n()}function n(){i(function(){t.showSplash=!1},1e3)}var s=this;s.busyMessage="Please wait ...",s.isBusy=!0,t.showSplash=!0,t.bannerV=!1,s.navline={title:e.appTitle,text:"Created by John Papa",link:"http://twitter.com/john_papa"},o()}angular.module("app.layout").controller("ShellController",t),t.$inject=["$rootScope","$timeout","config","logger"]}(),function(){"use strict";function t(t,i,e,a,o,n,s,r){function l(){c();var e=[u()];return i.all(e).then(function(){t.info("Activated layout View")})}function c(){m.navRoutes=g.filter(function(t){return t.settings&&t.settings.nav}).sort(function(t,i){return t.settings.nav-i.settings.nav})}function u(){return s.isLoggedin().then(function(t){return e.authUser=t,e.authUser})}function d(t){if(!t.title||!a.current||!a.current.title)return"";var i=t.title;return a.current.title.substr(0,i.length)===i?"current":""}function p(){console.log("modal"),e.modalInstance=n.open({animation:"true",templateUrl:"app/layout/modal.view.html",controller:"LoginController",controllerAs:"vm",size:"lg"})}var m=this,g=o.getStates();m.isCurrent=d,m.openModal=p,l()}angular.module("app.layout").controller("SidebarController",t),t.$inject=["logger","$q","$rootScope","$state","routerHelper","$uibModal","dataservice","toastr"]}(),function(){"use strict";function t(t,i,e,a,o,n){function s(){var i={email:u.inputEmail,pass:u.inputPass};o.submitSignUp(i).then(function(i){i.data?(t.success("El usuario se ha dado de alta correctamente, revise su correo","Alta"),n.go("dashboard")):t.error("Error, intentelo de nuevo mas tarde","Error")})}function r(){e.modalInstance.close("a")}function l(){r();var i={email:u.userEmail,pass:u.password};o.login(i).then(function(i){console.log(i.data),i.data.rows?(t.success(i.data.inf,"Bienvenido"),e.authUser=i.data.rows,console.log(i.data.rows)):(e.authUser=!1,t.error(i.data.inf,"Error"),u.error=i.data.inf)})}function c(){a.info("Activated Users View")}var u=this;u.title="Login",u.inputEmail="",u.inputPass="",u.submitSignUp=s,u.login=l,u.close=r,u.error=!1,c()}angular.module("app.login").controller("LoginController",t),t.$inject=["toastr","$uibModal","$rootScope","logger","dataservice","$state"]}(),function(){"use strict";function t(t,e,a,o){t.configureStates(i(e,a,o))}function i(t,i,e){return[{state:"signup",config:{url:"/signup",templateUrl:"app/login/signup.view.html",controller:"LoginController",controllerAs:"vm",title:"signup"}},{state:"successSocial",config:{url:"/successSocial",controller:"LoginController",resolve:{facebook:t.signupSocial}}}]}angular.module("app.login").run(t),t.$inject=["routerHelper","dataservice","$rootScope","$uibModal"]}(),function(){"use strict";var t=angular.module("app.widgets");t.config(["uiGmapGoogleMapApiProvider",function(t){t.configure({v:"3.26",libraries:"weather,geometry,visualization"})}])}(),function(){"use strict";function t(t){function i(t,i,o){o.$observe("htImgPerson",function(t){t=e+(t||a),o.$set("src",t)})}var e=t.imageBasePath,a=t.unknownPersonImageSource,o={link:i,restrict:"A"};return o}angular.module("app.widgets").directive("htImgPerson",t),t.$inject=["config"]}(),function(){"use strict";function t(){function t(t,i,e){t.toggleContent=function(){if("true"===t.allowCollapse){var e=angular.element(i).siblings(".widget-content");e.toggle()}}}var i={scope:{title:"@",subtitle:"@",rightText:"@",allowCollapse:"@"},templateUrl:"app/widgets/widget-header.html",restrict:"EA",link:t};return i}angular.module("app.widgets").directive("htWidgetHeader",t)}(),angular.module("app.core").run(["$templateCache",function(t){t.put("app/admin/admin.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class="widget wviolet"><div ht-widget-header title={{vm.title}}></div><div class="widget-content user"><h3>TODO: Implement Your Features</h3></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/camtourist/camtourist.html",'<section class=mainbar><section class=matter><label>Selecciona una ciudad:</label><select ng-model=selectedCities ng-options="city.ciudad for city in vm.cities track by city.ciudad" ng-change=getCityMap()></select><label>Hay {{vm.markers.length}} camtourists</label><br><br><div class=mapa><ui-gmap-google-map center=vm.map.center zoom=vm.map.zoom><ui-gmap-markers models=vm.markers coords="\'self\'" icon="\'icon\'" events=vm.map.markersEvents><ui-gmap-window show=vm.map.windows.show coords=vm.map.windows.model closeclick=vm.map.windows.closeClick isiconvisibleonclick=false><div><img src={{vm.infoWindow.imagen}} width=50px;><p>{{vm.infoWindow.punto_interes}}</p><p>{{vm.infoWindow.ciudad}}</p></div></ui-gmap-window></ui-gmap-markers></ui-gmap-google-map><br></div><div class=camtourist><div class="camtourist camtouristInt" ng-repeat="camtourist in vm.camtourists track by camtourist.id"><div class=punto_interes>{{camtourist.punto_interes}}</div><div class=ciudad>Ciudad: {{camtourist.ciudad}}</div><div class=pais>Pais: {{camtourist.pais}}</div><div class=details>{{camtourist.descripcion}}</div></div></div><div class=camtourist><div class="camtourist camtouristInt" ng-repeat="(key, value) in vm.camtouristsByCity track by key"><div class=ciudad>Ciudad: {{key}} - Nº de Camtourist: {{value}}</div></div></div></section></section>'),t.put("app/contact/contact.html",'<br><div class=container><form id=contactForm name=vm.contactForm class=form-contact><h2 class=form-contact-heading>Contact Us</h2><div class=control-group><input required ng-model=vm.inputName type=text id=inputName name=inputName placeholder=Name class=form-control dir=auto maxlength=100> <span class=text-danger ng-show="vm.contactForm.inputName.$error.required && (vm.contactForm.inputName.$dirty || vm.contactForm.inputName.$touched)">El campo es obligatorio</span></div><div class=control-group><input required ng-model=vm.inputEmail type=email id=inputEmail name=inputEmail placeholder="Email *" class=form-control maxlength=100> <span class=text-danger ng-show="vm.contactForm.inputEmail.$error.required && (vm.contactForm.inputEmail.$dirty || vm.contactForm.inputEmail.$touched)">El campo es obligatorio</span> <span class=text-danger ng-show=vm.contactForm.inputEmail.$error.email>Email no valido</span></div><div class=control-group><label for=sel1>Subject</label><select ng-model=vm.inputSubject class=form-control id=inputSubject name=inputSubject title="Choose subject"><option value>Info relativa a tus fotos</option><option value=Trabaja>Trabaja con nosotros</option><option value=sugerencias>Haznos sugerencias</option><option value=reclamaciones>Atendemos tus reclamaciones</option><option value=diferente>Algo diferente</option></select></div><div class=control-group><textarea required ng-model=vm.inputMessage class=form-control rows=4 name=inputMessage placeholder="Message *" style="max-width: 100%;" dir=auto></textarea> <span class=text-danger ng-show="vm.contactForm.inputMessage.$error.required && (vm.contactForm.inputMessage.$dirty || vm.contactForm.inputMessage.$touched)">El campo es obligatorio</span></div><input type=hidden name=token value=contactForm> <input class="btn btn-primary" type=submit name=submit id=submitBtn value=Enviar ng-show="vm.contactForm.inputName.$valid && vm.contactForm.inputEmail.$valid && vm.contactForm.inputMessage.$valid" ng-click=vm.send()> <img ng-show=loader.loading src=frontend/modules/contact/view/img/ajax-loader.gif alt="ajax loader icon" class=ajaxLoader><br><br><div id=resultMessage ng-class=vm.class>{{vm.message}}</div></form></div>'),t.put("app/core/404.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=bred><div class=pull-left><i class="fa fa-warning"></i></div><div class="datas-text pull-right"><a><span class=bold>404</span></a>Page Not Found</div><div class=clearfix></div></li></ul></div></div><div class=row><div class="widget wblue"><div ht-widget-header title="Page Not Found" allow-collapse=true></div><div class="widget-content text-center text-info"><div class=container>No soup for you!</div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),t.put("app/dashboard/dashboard.html",'<div class=banner><div class=container><div class=banner-top><div class=jumbotron><h1 class=textBanner>TUS FOTOS DE VIAJE SERÁN DIFERENTES</h1><p>PhotoTourist: Tu maleta de recuerdos</p><div class=banner-btn><a class="btn btn-primary btn-lg" href=# role=button>Regístrate Gratis</a></div></div></div></div></div><div class=services><div class=container><div class=services-top><div class="col-md-3 services-left"><img src=images/service-1.png alt><p>Localiza a las CamTourist</p></div><div class="col-md-3 services-left"><img src=images/service-2.png alt><p>Muestra tu Código Qr</p><span class=s-two></span></div><div class="col-md-3 services-left"><img src=images/service-3.png alt><p>Ahora Sonríe!!</p><span class=s-tre></span></div><div class="col-md-3 services-left"><img src=images/service-4.png alt><p>Descarga tus Fotos</p></div><div class=clearfix></div></div></div></div><div class=advantage><div class=container><div class=advantage-top><h3><span>A</span>DVANTAGE</h3></div><div class=advantage-bottom><div class=row><div class=col-md-4><div class=thumbnail><img src=images/ad-1.png alt><div class=caption><h3>Import photos from</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ora incidunt ut labore.</p></div></div></div><div class=col-md-4><div class=thumbnail><img src=images/ad-2.png alt><div class=caption><h3>Photo editing</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ora incidunt ut labore.</p></div></div></div><div class=col-md-4><div class=thumbnail><img src=images/ad-3.png alt><div class=caption><h3>Templates</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing. Ut enim ad minim, nostrud exercitation ullamco laboris nisi ut aliquip ex commodo.</p></div></div></div><div class=clearfix></div></div></div></div></div><div class=testimonials><div class=container><div class=testimonials-top><h3><span>T</span>estimonials</h3></div><div class=testimonials-bottom><img src=images/test-1.png alt><div class=test-text><h4>John Doe</h4><p>Wedding photographer</p></div><div class=test-btm><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><div class=next><a href=#>Next testimonial</a></div></div></div></div></div><div class=terms><div class=container><div class=terms-top><div class="col-md-4 terms-left"><div class=term-one><h4>Terms</h4><div class=term-bottom><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</p></div></div></div><div class="col-md-4 terms-left"><div class=term-one><h4>PAYMENT</h4><div class=term-bottom><p>Payment methods:</p><ul><li><p><a href=#>VISA</a></p></li><li><p><a href=#>MasterCard</a></p></li><li><p><a href=#>PayPal</a></p></li><li><p><a href=#>American Express</a></p></li></ul></div></div></div><div class="col-md-4 terms-left"><div class=term-one><h4>SHIPPING</h4><div class=term-bottom><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><h5>Free shipping for PremiumBook</h5></div></div></div><div class=clearfix></div></div></div></div>'),t.put("app/layout/ht-top-nav.html",'<div><div class=header-top id=home><div class=container><div class=head><div class=header-left><div class=logo><a href="#/"><img src=images/logo.png alt></a></div></div><div class=header-right ng-show=$root.authUser><a>Hola {{$root.authUser.name }} <img src="{{ $root.authUser.avatar}}"></a></div><div class=clearfix></div><div class=top-nav><nav ng-controller="SidebarController as vm"><ul><li class="nlightblue fade-selection-animation" ng-class=vm.isCurrent(r) ng-repeat="r in vm.navRoutes"><a ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li><li ng-hide=$root.authUser ng-click=vm.openModal()><a><i class="fa fa-sign-in"></i> Sign in</a></li><li ng-hide=$root.authUser class=login><a href=http://projects.com:3000/auth/facebook class="btn btn-block btn-social-icon btn-facebook"><span class="fa fa-facebook"></span></a></li><li ng-hide=$root.authUser class=login><a target=_self href=/auth/twitter class="btn btn-social-icon btn-twitter"><span class="fa fa-twitter"></span></a></li><div class=clearfix></div></ul><a href class=right_bt id=pull><span></span></a><table><tr ng-repeat="data in vm.data"><td>{{data}}</td></tr></table></nav><script type=text/javascript>\n              $(function() {\n                 var pull = $(\'#pull\');\n                 menu = $(\'nav ul\');\n                 menuHeight = menu.height();\n\n                 $(pull).on(\'click\', function(e) {\n                     e.preventDefault();\n                     menu.slideToggle();\n                 });\n             });\n\n             $(window).resize(function(){\n                 var w = $(window).width();\n                 if(w > 320 && menu.is(\':hidden\')) {\n                     menu.removeAttr(\'style\');\n                 }\n             });\n            </script></div><div id=sb-search class=sb-search ng-show=$root.authUser><a target=_self href=/api/logout><span class=sb-icon-search></span>Logout</a></div></div></div></div><div id=LoginModal></div></div>'),t.put("app/layout/modal.view.html",'<link rel=stylesheet href=src/client/styles/signup_view/signup.css><div class=col-md-3></div><div class=col-md-6><div class="login-box well"><form id=modal_form name=modal_form><legend>Sign In</legend><div class=form-group><label for=useremail>E-mail</label> <input required ng-model=vm.userEmail value id=useremail name=useremail placeholder=E-mail type=email class=form-control maxlength=100 ng-pattern="/^[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\\.[a-z0-9-]+)*$/i"> <span class=error_input ng-show="modal_form.useremail.$error.required && (modal_form.useremail.$dirty || modal_form.useremail.$touched)">El campo es obligatorio</span> <span class=error_input ng-show=modal_form.useremail.$error.email>Email no valido</span></div><div class=form-group><label for=password>Password</label> <input required ng-pattern="/^.{6,12}$/" ng-model=vm.password id=password name=password value placeholder=Password type=password class=form-control maxlength=100> <span class=error_input ng-show="modal_form.password.$error.required && (modal_form.password.$dirty || modal_form.password.$touched)">El campo es obligatorio</span> <span class=error_input ng-show=modal_form.password.$error.pattern>Password no válido</span></div><div class=input-group><div class=checkbox><label><input id=login-remember type=checkbox name=remember value=1> Remember me</label></div></div><div class=form-group><input type=submit ng-click=vm.login() class="btn btn-default btn-login-submit btn-block m-t-md" value=Login ng-show="modal_form.useremail.$valid && modal_form.password.$valid"></div><span class=text-center><a href=/resetting/request class=text-sm>Forgot Password?</a></span><div class=form-group><p class="text-center m-t-xs text-sm">Do not have an account?</p><a ng-click=vm.close() href=/signup class="btn btn-default btn-block m-t-md">Create an account</a></div></form></div></div><div class=col-md-3></div>'),t.put("app/layout/shell.html",'<div ng-controller="ShellController as vm"><header class=clearfix><ht-top-nav navline=vm.navline></ht-top-nav></header><section id=content class=content><div ui-view class=shuffle-animation></div><div ngplus-overlay ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><img src=images/busy.gif><div class="page-spinner-message overlay-message">{{vm.busyMessage}}</div></div><div ng-include="\'app/layout/sidebar.html\'"></div></section></div>'),t.put("app/layout/sidebar.html",'<div><div class=footer><div class=container><div class=footer-main><div class="col-md-8 footer-left"><div class="col-md-4 footer-one"><ul><li><a href=about.html>About us</a></li><li><a href=careers.html>Careers</a></li><li><a href=404.html>Help</a></li><li><a href=blog.html>Blog</a></li></ul></div><div class="col-md-4 footer-one"><ul><li><a href=#>Terms</a></li><li><a href=#>Payment</a></li><li><a href=#>Shipping</a></li><li><a href=contact.html>Contact</a></li></ul></div><div class="col-md-4 footer-one"><ul><li><a href=#>LIGHTBOOK</a></li><li><a href=#>CLASSICBOOK</a></li><li><a href=#>PREMIUMBOOK</a></li></ul></div><div class=clearfix></div></div><div class="col-md-4 footer-right"><div class=footer-two><ul><li><a href=#><span class=fb></span></a></li><li><a href=#><span class=b></span></a></li><li><a href=#><span class=cam></span></a></li></ul></div></div><div class=clearfix></div></div><div class=footer-bottom><p>Template by <a href="http://w3layouts.com/" target=_blank>W3layouts</a></p></div></div><a href=#home id=toTop class=scroll style="display: block;"><span id=toTopHover style="opacity: 1;"></span></a></div></div>'),t.put("app/login/login.html",""),t.put("app/login/signup.view.html",'<section id=pagina_alta><div class=titulo><p class=lead>Forma parte de la Familia PhotoTourist ;)</p><hr></div><form id=signup_form name=signup_form class><div class=control_signup><div class=redes_sociales><ul class=social><li ui-sref=login><img src=images/F_icon.svg alt=Facebook width=34px></li><li><img src=images/twitter-bird.svg alt=Twitter width=34px></li></ul></div><div class=control_inputs><label>Email *</label> <input required ng-model=vm.inputEmail type=email id=inputEmail name=inputEmail placeholder=Email class=form_inputs maxlength=100 ng-pattern="/^[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\\.[a-z0-9-]+)*$/i" ng-change=change_signup()> <span class=error_input ng-show="signup_form.inputEmail.$error.required && (signup_form.inputEmail.$dirty || signup_form.inputEmail.$touched)">El campo es obligatorio</span> <span class=error_input ng-show=signup_form.inputEmail.$error.email>Email no valido</span></div><div class=control_inputs><label>Password *</label><br><input ng-model=vm.inputPass ng-pattern="/^.{6,12}$/" ng-change=change_signup() type=password id=inputPass name=inputPass placeholder=password class=form-inputs value required><br><span class=error_input ng-show="signup_form.inputPass.$error.required && (signup_form.inputPass.$dirty || signup_form.inputPass.$touched)">El campo es obligatorio</span> <span class=error_input ng-show=signup_form.inputPass.$error.pattern>Password no válido</span><div id=e_singup_password></div></div><br><div class=control_submit><button type=Submit id=registrar_user name=registrar_user class="btn btn-primary btn-lg centrado" value=REGISTRARSE ng-show="signup_form.inputEmail.$valid && signup_form.inputPass.$valid" ng-click=vm.submitSignUp()>REGISTRARSE</button></div><div class><hr></div></div></form></section>'),t.put("app/widgets/widget-header.html",'<div class=widget-head ng-class="{\'collapsive\': allowCollapse === \'true\'}" ng-click=toggleContent()><div class="page-title pull-left">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class="widget-icons pull-right"></div><small class="pull-right page-title-subtle" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>')}]);