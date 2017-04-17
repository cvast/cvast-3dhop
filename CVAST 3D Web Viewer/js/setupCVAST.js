// VIEWER
var presenter = null;

function setup3dhopCVAST(source) { 
	presenter = new Presenter("draw-canvas");
	
	/* // TEST BLOCK OF CODE FOR source OF TYPE JSON
	// --- source of type JSON
	// Reading source
	var modjson = JSON.parse(source);
	
	//console.log(modjson.meshes);
	
	modarr = JSONtoArray(modjson);
	
	//console.log(modarr);
	
	var meshesBody = "";
	var modelInstancesBody = "";
	
	for (var i = 0, len = modarr[1].length; i < len/2; i++) {
		meshesBody = meshesBody.concat("\"" + modarr[1][i*2] + "\" : { url \"" + modarr[1][(i*2)+1][1] + "\"}"); // KER - Only URL currently
		if ((len > 2) && (i+1 < len/2)) {
			meshesBody = meshesBody.concat(", ");
		}
	}
	
	//console.log(meshesBody);
	
	function JSONtoArray(obj) {
		const result = [];
		for (const prop in obj) {
			const value = obj[prop];
			result.push(prop); // KER
			if (typeof value === 'object') {
				
				result.push(JSONtoArray(value));
			} else {
				result.push(value);
			}
		}
		return result;
	}*/
	
	/* TEST BLOCK OF CODE - NOT WORKING
	var test = "\"deco\" : { url: \"source/custom/deco.ply\" }";
	console.log(test);
	
	var sdec = "deco";
	var surl = "source/custom/deco.ply";
	
	var mj = '{ "meshes" : { "deco" : { "url" : "source/custom/deco.ply" } }, "modelInstances" : { "Deco" : { "mesh" : "deco" } }, "trackball" : { "type" : "TurntablePanTrackball", "trackOptions" : { "startDistance" : 1.3, "startPhi" : 0, "startTheta" : 0, "minMaxDist" : [0.8, 2.5], "minMaxPhi" : [0, 180], "minMaxTheta" : [0, 50] } }, "space" : { "centerMode" : "scene", "radiusMode" : "scene" } }';
	presenter.setScene(JSON.parse(mj));
	presenter.setScene(JSON.parse(modjson));
	*/

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
			/*type : TurntablePanTrackball,
			trackOptions : {
				startDistance: 1.3,
				startPhi: 40.0,
				startTheta: 20.0,
				minMaxDist: [0.8, 2.5],
				minMaxPhi: [-180, 180],
				minMaxTheta: [-50.0, 70.0]
			}*/

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