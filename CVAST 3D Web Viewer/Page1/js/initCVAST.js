// NOT WORKING YET

function init3dhopCVAST(){
	
	console.log("started init3dhopCVAST...")
	
	// DEPENDENCIES - SCRIPTS JS
	var path3DHOP = "../../3DHOP_4.1/minimal/js/";
	var scriptsToBeImported = ["spidergl",  "presenter", "nexus", "ply", "trackball_turntable", "trackball_turntable_pan", "trackball_pantilt", "trackball_sphere", "init"];
	
	for (var i = 1, len = scriptsToBeImported.length; i < len; i++) {
		console.log("Import: " + path3DHOP + scriptsToBeImported[i] +".js");
		
		include(path3DHOP + scriptsToBeImported[i] + ".js");
		//$.getScript(path3DHOP + scriptsToBeImported[i] + ".js", function(){
		//	console.log("Import: " + scriptsToBeImported[i] +".js has been imported.");
		//});
	}

	
	$(document).ready(function(){
		console.log("init3dhop");
		init3dhop();
	});
}

function include(destination) {
	var e=window.document.createElement('script');
	e.setAttribute('src',destination);
	window.document.body.appendChild(e);
}