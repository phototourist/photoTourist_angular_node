/* jshint -W117, -W030 */
describe('camtourist routes', function() {
  describe('state', function() {
    var view = 'app/camtourist/camtourist.html';

    beforeEach(function() {
      module('app.camtourist', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state camtourist to url /camtourist ', function() {
      expect($state.href('camtourist', {})).to.equal('/camtourist');
    });

    it('should map /camtourist route to camtourist View template', function() {
      expect($state.get('camtourist').templateUrl).to.equal(view);
    });

    it('of admin should work with $state.go', function() {
      $state.go('camtourist');
      $rootScope.$apply();
      expect($state.is('camtourist'));
    });
  });
});
