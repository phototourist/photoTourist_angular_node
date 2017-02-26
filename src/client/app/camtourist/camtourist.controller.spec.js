/* jshint -W117, -W030 */
describe('CamtouristController', function() {
    var controller;
    var scope;
    var camtourist = mockData.getMockCamtourist();

    var dsFake;
    var markersFake;

    beforeEach(function() {
        bard.appModule('app.camtourist');
        bard.inject('$controller', '$rootScope', '$q', '$log', '$state', '$httpBackend');

        scope = {
            getCityMap: function() {
                return $q.when({ 'description': '343242' });
            }
        };

        dsFake = {
            getLocation: function() {
                return $q.when({
                    'latitude': '37.1899',
                    'longitude': '-3.607206'
                });
            },
            getCamtourist: function() {
                return $q.when(camtourist);
            },
            getCities: function() {
                return $q.when({ 'ciudad': 'Barcelona' }, { 'ciudad': 'Madrid' });
            }
        };

        controller = $controller('CamtouristController', { $scope: scope, dataservice: dsFake });
        $rootScope.$apply();
    });

    // bard.verifyNoOutstandingHttpRequests();

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