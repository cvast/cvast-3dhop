// VIEWER
var presenter = null;

function setup3dhopCVAST(source) { 
	presenter = new Presenter("draw-canvas");
	
	presenter.setScene({
		meshes: {
			"mesh1" : { url: source } // The path in which the model to be loaded in the viewer is stored
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
}

function actionsToolbar(action) {
	if(action=='home') presenter.resetTrackball(); 
	else if(action=='zoomin') presenter.zoomIn();
	else if(action=='zoomout') presenter.zoomOut(); 
	else if(action=='light' || action=='light_on') {
		presenter.enableLightTrackball(!presenter.isLightTrackballEnabled());
		lightSwitch();
	} else if(action=='pick' || action=='pick_on') {
		presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
		pickpointSwitch();
		presenter._onEndPickingPoint = onEndPick;
	} else if(action=='ann' || action=='ann_on') { 
		presenter.enablePickpointMode(!presenter.isPickpointModeEnabled());
		annotationSwitch();
		presenter._onEndPickingPoint = onEndAnnotation;
	} else if(action=='full' || action=='full_on') fullscreenSwitch(); 
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
	var annID = Math.random();
	
	if (annotation != null) {
		alert("Annotation ID# "+annID+"\r\nCoords: [ "+x+" , "+y+" , "+z+" ]\r\nAnnotation: "+annotation);
	} else {
		alert("Warning: annotation cannot be empty");
	}
	
}