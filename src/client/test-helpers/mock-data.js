var mockData = (function() {
    return {
        getMockCamtourist: getMockCamtourist,
        getMockStates: getMockStates
    };

    function getMockStates() {
        return [{
            state: 'camtourist',
            config: {
                url: '/camtourist',
                templateUrl: 'app/camtourist/camtourist.html',
                title: 'CAMTOURIST',
                settings: {
                    nav: 3,
                    content: '<i class="fa fa-map-marker"></i> Camtourist'
                }
            }
        }];
    }

    function getMockCamtourist() {
        return [{
                id: '1',
                punto_interes: 'Sagrada Familia',
                categoria: 'Catedral',
                ciudad: 'Barcelona',
                provincia: 'Barcelona',
                pais: 'España',
                hora_inicio: '08:30',
                hora_final: '22:00',
                latitud: '41.4039',
                longitud: '2.17386',
                descripcion: 'Lorem ipsum dolor sit amet1',
                principal: '1',
                image: '',
            }, {
                id: '2',
                punto_interes: 'Alhambra',
                categoria: 'Catedral',
                ciudad: 'Granada',
                provincia: 'Granada',
                pais: 'España',
                hora_inicio: '09:30',
                hora_final: '20:00',
                latitud: '37.1769',
                longitud: '-3.58988',
                descripcion: 'Lorem ipsum dolor sit amet1',
                principal: '0',
                image: '',
            }, {
                id: '3',
                punto_interes: 'Triana',
                categoria: 'Panorama',
                ciudad: 'Sevilla',
                provincia: 'Sevilla',
                pais: 'España',
                hora_inicio: '10:30',
                hora_final: '23:00',
                latitud: '37.3839',
                longitud: '-6.00363',
                descripcion: 'Lorem ipsum dolor sit amet1',
                principal: '1',
                image: '',
            }

        ];
    }
})();
