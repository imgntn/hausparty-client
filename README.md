<b>hausparty ordering app</b>
==================================
this is a backbone.js client-side app for the hausparty api.

<b>prerequisites:</b>  <br>node.js installed, npm installed, bower installed, gulp installed, firebase tools installed 

setup node packages:<br>
<code>npm install</code>

setup bower packages<br>
<code>bower install</code><br><br>
<b>develop / build:</b> <br>
start a development environment / do a build:
(turn on livereload extension in your browser)<br>
<code>gulp</code>
<br><br>
If you change files, be sure to "gulp" from the command line before you deploy on firebase to build a new bundle <br><br>
<b>deploy:</b> <br>
deploy to firebase:<br>
<code>firebase deploy</code>

<b>File Structure</b><br>
/build --> scratch folder during build <br>
/gulp --> build tasks <br>
/node_modules --> vendor libraries <br>
/src --> hausparty source code <br>
/static-fileserver --> gets deployed to firebase <br>
package.json --> lists transforms, globals, etc.  <br>
gulpfile.js --> points to /gulp tasks <br>
<br>
<br>
<b>Source Folder File Structure</b><br>
/helpers --> format data for templates<br>
/models --> business logic <br>
/partials --> can be used inside of templates<br>
/spec --> tests (minimal)<br>
/styles -->  css controls how things look<br>
/styles/images --> where to keep images<br>
/styles/images --> where to keep fonts<br>
/templates --> rendered by views<br>
/views  --> put content on the page<br>
index.js --> the main app.  contains the router.

