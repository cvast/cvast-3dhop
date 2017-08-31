define(['presenter-original'], function () {

    require(['presenter-original']);

    presenter = new Presenter("draw-canvas");
    presenter._isAnnotatingPickpoint = false;
    return presenter;

});

