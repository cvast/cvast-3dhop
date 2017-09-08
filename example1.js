require.config({
    paths: {
        'spidergl': 'bower_components/3d-hop/minimal/js/spidergl',
        'jquery': 'bower_components/3d-hop/minimal/js/jquery',
        'nexus': 'bower_components/3d-hop/minimal/js/nexus',
        'presenter-3dhop': 'bower_components/3d-hop/minimal/js/presenter',
        'ply': 'bower_components/3d-hop/minimal/js/ply',
        'trackball-sphere': 'bower_components/3d-hop/minimal/js/trackball_sphere',
        'trackball-turntable': 'bower_components/3d-hop/minimal/js/trackball_turntable',
        'trackball-turntable-pan': 'bower_components/3d-hop/minimal/js/trackball_turntable_pan',
        'trackball-pantilt': 'bower_components/3d-hop/minimal/js/trackball_pantilt',
        'init-3dhop': 'bower_components/3d-hop/minimal/js/init'
    }
});

define([
    'lib/main'
], function (cvast_3dhop) {

    var filepath = "https://s3.amazonaws.com/test-cvast-arches-storage/uploadedfiles/485k_perpixel.nxs";
    cvast_3dhop.setupURL(filepath);
});
