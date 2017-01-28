/* jshint -W117, -W030 */
describe('CamtouristController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.camtourist');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('CamtouristController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Camtourist controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Camtourist', function() {
        expect(controller.title).to.equal('Camtourist');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
