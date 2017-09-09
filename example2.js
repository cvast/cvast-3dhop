define([
    'cvast-3dhop'
], function (cvast_3dhop) {

    var filepath = "https://s3.amazonaws.com/test-cvast-arches-storage/uploadedfiles/485k_perpixel.nxs";

    var jsonInput = {
        "meshes":
        {
            "deco": {
                "url": filepath
            }
        },
        "modelInstances": {
            "Deco": {
                "mesh": "deco"
            }
        },
        "spots": {},
        "trackball": {
            "type": "SphereTrackball",
            "trackOptions": {
                "startDistance": 2.5,
                "minMaxDist": [0.5, 3.0]
            }
        },
        "space": {
            "centerMode": "scene",
            "radiusMode": "scene"
        },
        "hotspots": [
            {
                "ID": "ID111",
                "Coordinates": {
                    "x": -0.12, "y": 0.2, "z": 0.08
                },
                "Annotations": [
                    { "ID": "IDA1", "Value": "Annotation A1" },
                    { "ID": "IDA2", "Value": "Annotation A2" },
                    { "ID": "IDA3", "Value": "Annotation A3" }
                ]
            },
            {
                "ID": "ID222",
                "Coordinates": {
                    "x": 0.18, "y": 0.19, "z": 0.1
                },
                "Annotations": [
                    { "ID": "IDB1", "Value": "Annotation B1" },
                    { "ID": "IDB2", "Value": "Annotation B2" },
                    { "ID": "IDB3", "Value": "Annotation B3" }
                ]
            },
            {
                "ID": "ID333",
                "Coordinates": {
                    "x": 0.12, "y": 0.04, "z": 0.11
                },
                "Annotations": [
                    { "ID": "IDC1", "Value": "Annotation C1" },
                    { "ID": "IDC2", "Value": "Annotation C2" },
                    { "ID": "IDC3", "Value": "Annotation C3" }
                ]
            }
        ]
    };

    cvast_3dhop.setupJSON(jsonInput);
});
