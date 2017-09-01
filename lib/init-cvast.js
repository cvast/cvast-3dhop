require(['init-3dhop']);


// CVAST Override
// anchor pickpoint, measurement and sections panels to the respective buttons
function anchorPanels() {
    if ($('#pickpoint-box')[0] && $('#pick')[0]) {
        $('#pickpoint-box').css('left', ($('#pick').position().left + $('#pick').width() + $('#toolbar').position().left + 5));
        $('#pickpoint-box').css('top', ($('#pick').position().top + $('#toolbar').position().top));
    }
    // CVAST
    if ($('#pickpoint-ann-box')[0] && $('#ann')[0]) {
        $('#pickpoint-ann-box').css('left', ($('#ann').position().left + $('#ann').width() + $('#toolbar').position().left + 5));
        $('#pickpoint-ann-box').css('top', ($('#ann').position().top + $('#toolbar').position().top));
    }
    if ($('#measure-box')[0] && $('#measure')[0]) {
        $('#measure-box').css('left', ($('#measure').position().left + $('#measure').width() + $('#toolbar').position().left + 5));
        $('#measure-box').css('top', ($('#measure').position().top + $('#toolbar').position().top));
    }
    if ($('#sections-box')[0] && $('#sections')[0]) {
        $('#sections-box').css('left', ($('#sections').position().left + $('#sections').width() + $('#toolbar').position().left + 5));
        $('#sections-box').css('top', ($('#sections').position().top + $('#toolbar').position().top));
    }
}


// CVAST Override
function pickpointSwitch(on) {
    if (on === undefined) on = presenter.isPickpointModeEnabled();

    if (on) {
        $('#pick').css("visibility", "hidden");
        $('#pick_on').css("visibility", "visible");
        $('#pickpoint-box').fadeIn().css("display", "table");
        $('#draw-canvas').css("cursor", "crosshair");
    }
    else {
        if (window.getSelection && window.getSelection() != '') window.getSelection().removeAllRanges();
        else if (document.selection && document.selection.createRange() != '') document.selection.empty();
        $('#pick_on').css("visibility", "hidden");
        $('#pick').css("visibility", "visible");
        $('#pickpoint-box').css("display", "none");
        $('#pickpoint-output').html("[ 0 , 0 , 0 ]");
        if (!presenter.isAnyMeasurementEnabled()) $('#draw-canvas').css("cursor", "default");
    }
}


// CVAST new
function annotationSwitch(on) {
    if (on === undefined) {
        on = presenter.isPickpointModeEnabled();
    }

    if (on) {
        presenter._isAnnotatingPickpoint = true;
        $('#ann').css("visibility", "hidden");
        $('#ann_on').css("visibility", "visible");
        $('#pickpoint-ann-box').fadeIn().css("display", "table");
        $('#draw-canvas').css("cursor", "crosshair");
    }
    else {
        presenter._isAnnotatingPickpoint = false;
        if (window.getSelection && window.getSelection() != '') window.getSelection().removeAllRanges();
        else if (document.selection && document.selection.createRange() != '') document.selection.empty();
        $('#ann_on').css("visibility", "hidden");
        $('#ann').css("visibility", "visible");
        $('#pickpoint-ann-box').css("display", "none");
        $('#pickpoint-ann-output').html("[ 0 , 0 , 0 ]");
        if (!presenter.isAnyMeasurementEnabled()) $('#draw-canvas').css("cursor", "default");
    }
}
