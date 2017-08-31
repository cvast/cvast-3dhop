_sourceJSON = [];


require.config({
    baseUrl: "./lib",
    paths: {
        'presenter-cvast': 'presenterCVAST',
        'init-cvast': 'initCVAST',
        'spidergl': '../node_modules/3d-hop/minimal/js/spidergl',
        'jquery': '../node_modules/3d-hop/minimal/js/jquery',
        'nexus': '../node_modules/3d-hop/minimal/js/nexus',
        'presenter-original': '../node_modules/3d-hop/minimal/js/presenter',
        'ply': '../node_modules/3d-hop/minimal/js/ply',
        'trackball-sphere': '../node_modules/3d-hop/minimal/js/trackball_sphere',
        'trackball-turntable': '../node_modules/3d-hop/minimal/js/trackball_turntable',
        'trackball-turntable-pan': '../node_modules/3d-hop/minimal/js/trackball_turntable_pan',
        'trackball-pantilt': '../node_modules/3d-hop/minimal/js/trackball_pantilt',
        'init-original': '../node_modules/3d-hop/minimal/js/init',
    },
    shim: {
        'spidergl': {
            exports: 'SpiderGL'
        },
        'jquery': {
            deps: ['spidergl'],
        },
        'presenter-original': {
            deps: ['jquery'],
            exports: 'Presenter'
        },
        'nexus': {
            deps: ['presenter-original'],
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
        'init-original': {
            deps: ['trackball-pantilt']
        },
        'cvast-three-d-hop': {
            deps: ['init']
        },
    }
});

define([
    'spidergl',
    'jquery',
    'nexus',
    'trackball-sphere',
    'trackball-turntable',
    'trackball-turntable-pan',
    'trackball-pantilt',
    'ply',
    'init-original',
    'presenter-cvast'
], function (spidergl, $, nexus, trackball_sphere, trackball_turntable, trackball_turntable_pan, trackball_pantilt, ply, init, presenter) {

    require(['actionsToolbar'])
    require(['init-cvast'])
    init3dhop();

    return {

        setupURL: function (source) {
            _sourceJSON = {
                meshes: {
                    // The path in which the model to be loaded in the viewer is stored
                    "mesh1": { url: source }
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