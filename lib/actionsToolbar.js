require(['init-cvast']);


function actionsToolbar(action) {
    if (action === 'home') {
        presenter.resetTrackball();
    }

    else if (action === 'zoomin') {
        presenter.zoomIn();
    }
    else if (action === 'zoomout') {
        presenter.zoomOut();
    }

    else if (action === 'light' || action === 'light_on') {
        presenter.enableLightTrackball(!presenter.isLightTrackballEnabled());
        lightSwitch();
    } 

    else if (action === 'pick' || action === 'pick_on') {
        // --- CVAST ---
        if (presenter._isAnnotatingPickpoint) {
            presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
            annotationSwitch();
        }
        // --- end CVAST ---

        presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
        pickpointSwitch();
        presenter._onEndPickingPoint = onEndPick;
    } 

    else if (action === 'full' || action === 'full_on') {
        fullscreenSwitch();
    }

    else if (action === 'hotspot' || action === 'hotspot_on') {
        presenter.toggleSpotVisibility(HOP_ALL, true);
        presenter.enableOnHover(!presenter.isOnHoverEnabled());
        hotspotSwitch();
    }

    // --- CVAST ---
    else if (action === 'ann' || action === 'ann_on') {
        if (!presenter._isAnnotatingPickpoint && presenter._isMeasuringPickpoint) {
            presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
            pickpointSwitch();
        }
        presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
        annotationSwitch();
    } 

    else if (action === 'view_ann' || action === 'hide_ann') {
        if (presenter.isPickpointModeEnabled()) {
            presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
            pickpointSwitch();
            if (presenter._isAnnotatingPickpoint) {
                annotationSwitch();
            }
        }

        createSpots();

        trackballPosition = presenter.getTrackballPosition();
        presenter.setScene(_sourceJSON);
        presenter.setTrackballPosition(trackballPosition);

        presenter.toggleSpotVisibility(HOP_ALL, true);
        presenter.enableOnHover(!presenter.isOnHoverEnabled());
        hotspotSwitch();
    }


    actionToolbarEventOverrides();
}

function actionToolbarEventOverrides(){
	presenter._onEndPickingPoint = onEndPick;
	presenter._onEndPickingPoint = onEndAnnotation;
	presenter._onPickedSpot = onPickedSpot;    
}

function onEndPick(point) {
    // .toFixed(2) sets the number of decimals when displaying the picked point	
    var x = point[0].toFixed(2);
    var y = point[1].toFixed(2);
    var z = point[2].toFixed(2);
    $('#pickpoint-output').html("[ " + x + " , " + y + " , " + z + " ]");
}

function onEndAnnotation(point) {
    // .toFixed(2) sets the number of decimals when displaying the picked point	
    var x = point[0].toFixed(2);
    var y = point[1].toFixed(2);
    var z = point[2].toFixed(2);
    $('#pickpoint-ann-output').html("[ " + x + " , " + y + " , " + z + " ]");

    // CUSTOM ANNOTATION
    var annotation = prompt("Insert annotation:", "Your annotation here");
    var annotationID = Math.random();

    if (annotation != null && annotation.localeCompare("Your annotation here") != 0 && annotation.localeCompare("") != 0) {
        alert("Annotation ID# " + annotationID + "\r\nCoords: [ " + x + " , " + y + " , " + z + " ]\r\nAnnotation: " + annotation);

        // Push the new created annotation in the annotation list
        _sourceJSON.hotspots[_sourceJSON.hotspots.length] = {
            ID: Math.random(), Coordinates: { x: parseFloat(x), y: parseFloat(y), z: parseFloat(z) },
            Annotations: [{ ID: annotationID, value: annotation }]
        };
    } else {
        alert("Warning: annotation cannot be empty");
    }
}

// Add new instances of the marker in the scene
function createSpots() {
    for (i = 0; i < _sourceJSON.hotspots.length; i++) {
        _sourceJSON.spots[i] = {
            mesh: "marker",
            transform: {
                translation: [_sourceJSON.hotspots[i].Coordinates.x,
                _sourceJSON.hotspots[i].Coordinates.y, _sourceJSON.hotspots[i].Coordinates.z]
            },
            color: [0, 0.2, 0.5],
            alpha: 1
        };
    }
}

function onPickedSpot(id) {
    // PRINT STORED ANNOTATIONS FOR PICKED SPOT
    var prevAnnotations = "Previous Annotations:\r\n"
    for (i = 0; i < _sourceJSON.hotspots[id].Annotations.length; i++) {
        prevAnnotations = prevAnnotations +
            "Annotation ID: " + _sourceJSON.hotspots[id].Annotations[i].ID + "\r\n" +
            "Value: " + _sourceJSON.hotspots[id].Annotations[i].value + "\r\n";
    }

    // CUSTOM ANNOTATION
    var annotation = prompt(prevAnnotations + "\r\nAdd annotation to this hotspot:", "Your annotation here");
    var annotationID = Math.random();

    if (annotation != null && annotation.localeCompare("Your annotation here") != 0 && annotation.localeCompare("") != 0) {
        alert("Hotspot ID#: [ " + _sourceJSON.hotspots[id].ID + " ]\r\nAnnotation ID#: [ " + annotationID + " ]\r\nValue: " + annotation);
        // Push the new created annotation in the annotation list
        _sourceJSON.hotspots[id].Annotations[_sourceJSON.hotspots[id].Annotations.length] =
            { ID: annotationID, value: annotation };
    } else {
        alert("Warning: annotation cannot be empty");
    }
}