# cvast-3dhop

3DHOP (3D Heritage Online Presenter) is an open-source software package for the creation of interactive Web presentations of high-resolution 3D models, oriented to the Cultural Heritage field. This project is a customized version of the official 3DHOP distribution.

Please see the [3DHOP website](http://vcg.isti.cnr.it/3dhop/) for more information on the 3DHOP Viewer.

The 3DHOP official distribution is available [here](http://vcg.isti.cnr.it/3dhop/download.php).

## System Requirements

3DHOP official release does require an up-to-date web browser. It is supported and successfully tested on the current versions of :

* Firefox
* Chrome
* Safari
* Opera
* Edge.

**cvast-3dhop customized version:** we tested our customized version on Firefox; issues have been reported on Chrome.

Minimum system requirements:

3DHOP is a software package with full portability: it can run on all the principal OS (Windows, Mac OS, Linux) equipped with an up-to-date Web browser. 

## Running cvast-3dhop

1. Download the content of cvast-3dhop folder

2.  Open an html file from folder "\cvast-3dhop\CVAST 3D Web Viewer" directly in your browser

## Load a model into the viewer

Your model must have PLY or NXS formats. Textures (where apply) must be encoded with a color vertex format.

Change source path:
    * In CUSTOM_Annotations.html : (line **53**) "Decoration" : { url: "models/deco.ply" }
    * In CUSTOM_Annotations2.html : (line **55**) var source = "models/deco.ply";
