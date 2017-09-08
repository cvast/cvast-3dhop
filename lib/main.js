
require.config({
    shim: {
        'spidergl': {
            exports: 'SpiderGL'
        },
        'jquery': {
            deps: ['spidergl'],
        },
        'presenter-3dhop': {
            deps: ['jquery'],
            exports: 'Presenter'
        },
        'nexus': {
            deps: ['presenter-3dhop'],
            exports: 'Nexus'
        },
        'ply': {
            deps: ['nexus'],
        },
        'trackball-sphere': {
            deps: ['ply'],
            exports: 'PanTiltTrackball'
        },
        'trackball-turntable': {
            deps: ['ply'],
            exports: 'TurnTableTrackball'
        },
        'trackball-turntable-pan': {
            deps: ['ply'],
            exports: 'TurntablePanTrackball'
        },
        'trackball-pantilt': {
            deps: ['ply'],
            exports: 'PanTiltTrackball'
        },
        'init-3dhop': {
            deps: ['trackball-pantilt']
        }
    }
});

define([
    'lib/presenter-cvast',
    'spidergl',
    'jquery',
    'nexus',
    'trackball-sphere',
    'trackball-turntable',
    'trackball-turntable-pan',
    'trackball-pantilt',
    'ply',
    'init-3dhop',
    'lib/init-cvast',
    'lib/actions-toolbar'
], function (presenter) {

    require(['lib/init-cvast']);

    init3dhop();

    return {

        setupURL: function (source) {
            _sourceJSON = {
                meshes: {
                    // The path in which the model to be loaded in the viewer is stored
                    "mesh1": { url: source },
                    "marker": {
                        url: "models/Marker.ply",
                        transform: {
                            scale: [.025, .025, 0.025]
                        }
                    }
                },
                modelInstances: {
                    "Inst1": {
                        mesh: "mesh1"
                    }
                },
                trackball: {
                    type: SphereTrackball,
                    trackOptions: {
                        startDistance: 2.5,
                        minMaxDist: [0.5, 3.0]
                    }
                },
                space: {
                    centerMode: "scene",
                    radiusMode: "scene"
                }
            }

            presenter.setScene(_sourceJSON);
        },

        setupJSON: function (sourceJSON) {

            _sourceJSON = sourceJSON;

            // trackball.type should be a function (a constructor): conversion from string to function
            _sourceJSON.trackball.type = eval("(" + _sourceJSON.trackball.type + ")");

            // Add marker mesh to scene (the marker will not be instanciated now)
            _sourceJSON.meshes.marker = {
                url: "models/Marker.ply",
                transform: { scale: [.025, .025, 0.025] /*, translation : [0.06, -0.19, 0.2]*/ },
            };

            presenter.setScene(_sourceJSON);
        }
    }
});