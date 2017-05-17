// VIEWER
var presenter = null;
    
// Parsed JSON source, parameter used by setupJSON
var _sourceJSON = [];

function setupURL(source) { 
	presenter = new Presenter("draw-canvas");
	
	presenter.setScene({
		meshes: {
			// The path in which the model to be loaded in the viewer is stored
			"mesh1" : { url: source }
		},
		modelInstances : {
			"Inst1" : {
				mesh : "mesh1"
			}
		},
		trackball: {
			type: SphereTrackball,
			trackOptions : {
				startDistance : 2.5,
				minMaxDist: [0.5, 3.0]
			}
		},
		space: {
			centerMode: "scene",
			radiusMode: "scene"
		}
	});
	
	presenter._onEndPickingPoint = onEndPick;
	presenter._onEndPickingPoint = onEndAnnotation;
	presenter._onPickedSpot = onPickedSpot;
}

function setupJSON(source) { 
	presenter = new Presenter("draw-canvas");

	// Parse the JSON String into a JSON Object
	_sourceJSON = JSON.parse(source);

	// trackball.type should be a function (a constructor): conversion from string to function
	_sourceJSON.trackball.type = eval("(" + _sourceJSON.trackball.type + ")");

	// Add marker mesh to scene (the marker will not be instanciated now)
	_sourceJSON.meshes.marker = { url : "models/Marker.ply", 
		transform: { scale : [.025, .025, 0.025] /*, translation : [0.06, -0.19, 0.2]*/ }, };
	// Add an instance of the marker to the scene
	// _sourceJSON.modelInstances.Marker = { mesh : "marker" };

	presenter.setScene(_sourceJSON);

	presenter._onEndPickingPoint = onEndPick;
	presenter._onEndPickingPoint = onEndAnnotation;
	presenter._onPickedSpot = onPickedSpot;
}

function actionsToolbar(action) {
	if(action=='home') presenter.resetTrackball(); 
	else if(action=='zoomin') presenter.zoomIn();
	else if(action=='zoomout') presenter.zoomOut(); 
	else if(action=='light' || action=='light_on') {
		presenter.enableLightTrackball(!presenter.isLightTrackballEnabled());
		lightSwitch();
	} else if(action=='pick' || action=='pick_on') {
		// --- CVAST ---
		if (presenter._isAnnotatingPickpoint) {
			presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
			annotationSwitch();
		}
		// --- end CVAST ---

		presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
		pickpointSwitch();
		presenter._onEndPickingPoint = onEndPick;
	} else if(action=='full' || action=='full_on') fullscreenSwitch(); 
	else if(action=='hotspot'|| action=='hotspot_on') { 
    	presenter.toggleSpotVisibility(HOP_ALL, true);
		presenter.enableOnHover(!presenter.isOnHoverEnabled());
    	hotspotSwitch();
	}

	// --- CVAST ---
	else if(action=='ann' || action=='ann_on') {
		if (!presenter._isAnnotatingPickpoint && presenter._isMeasuringPickpoint) {
			presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
			pickpointSwitch();
		}
		presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
		annotationSwitch();
	} else if(action=='view_ann' || action=='hide_ann') { 
		if (presenter.isPickpointModeEnabled()){
			presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
			pickpointSwitch();
			if (presenter._isAnnotatingPickpoint) {
				annotationSwitch();
			}
		}
		
		console.log(_sourceJSON);
		createSpots();
		console.log(_sourceJSON);

		presenter.setScene(_sourceJSON);
		presenter.toggleSpotVisibility(HOP_ALL, false);
	} 
}


function onEndPick(point) {
	// .toFixed(2) sets the number of decimals when displaying the picked point	
	var x = point[0].toFixed(2);
	var y = point[1].toFixed(2);
	var z = point[2].toFixed(2);
    $('#pickpoint-output').html("[ "+x+" , "+y+" , "+z+" ]");
}

function onEndAnnotation(point) {
	// .toFixed(2) sets the number of decimals when displaying the picked point	
	var x = point[0].toFixed(2);
	var y = point[1].toFixed(2);
	var z = point[2].toFixed(2);
    $('#pickpoint-ann-output').html("[ "+x+" , "+y+" , "+z+" ]");
    
	// CUSTOM ANNOTATION
	var annotation = prompt("Insert annotation:", "Your annotation here");
	var annotationID = Math.random();
	
	if (annotation != null) {
		alert("Annotation ID# "+annotationID+"\r\nCoords: [ "+x+" , "+y+" , "+z+" ]\r\nAnnotation: "+annotation);
	} else {
		alert("Warning: annotation cannot be empty");
	}

	// Push the new created annotation in the annotation list
	_sourceJSON.hotspots[_sourceJSON.hotspots.length] = { ID : Math.random(), Coordinates : { x : parseFloat(x), y : parseFloat(y), z : parseFloat(z) },
		Annotations : [ { ID : annotationID, value : annotation } ] };
	
}

// Add new instances of the marker in the scene
function createSpots() {
	for(i = 0; i<_sourceJSON.hotspots.length; i++) {
		_sourceJSON.spots[i] = { mesh : "marker",
			transform : { translation : [_sourceJSON.hotspots[i].Coordinates.x, 
				_sourceJSON.hotspots[i].Coordinates.y, _sourceJSON.hotspots[i].Coordinates.z] }, 
			color : [0, 0.2, 0.5],
			alpha : 1 } ;
	} 
}

function onPickedSpot(id) {
	// CUSTOM ANNOTATION
	var annotation = prompt("Add annotation to this hotspot:", "Your annotation here");
	var annotationID = Math.random();

	if (annotation != null) {
		alert("Hotspot ID#: [ " + _sourceJSON.hotspots[id].ID + " ]\r\nAnnotation ID#: [ " + annotationID + " ]\r\nValue: " + annotation);
	} else {
		alert("Warning: annotation cannot be empty");
	}

	// Push the new created annotation in the annotation list
	_sourceJSON.hotspots[id].Annotations[_sourceJSON.hotspots[id].Annotations.length] =
		{ ID: annotationID, value: annotation };

	console.log(_sourceJSON.hotspots[id].Annotations[_sourceJSON.hotspots[id].Annotations.length-1]);
}