/* jshint -W117, -W030 */
describe('MyPhotosController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.myPhotos');
        bard.inject('$httpBackend', '$controller', '$log', '$rootScope');
    });

    beforeEach(function() {
        controller = $controller('AdminController');
        //$rootScope.$apply();
    });

    // bard.verifyNoOutstandingHttpRequests();

    describe('myPhotos controller', function() {
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Admin', function() {
                expect(controller.title).to.equal('Admin');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});